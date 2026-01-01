export async function fileToWebVideoFile(
    file: File,
    options?: {
      maxWidth?: number;
      maxHeight?: number;
      mimeType?: string; // "video/webm" або "video/mp4"
      quality?: number;  // 0.1–1.0
    }
  ): Promise<File> {
    if (!file.type.startsWith("video/")) return file;
  
     
    const {
      maxWidth = 1000,
      maxHeight = 700,
      mimeType = "video/webm",
      quality = 0.9,
    } = options || {};
  
     
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.muted = true;           // ✅ критично!
    video.playsInline = true;     // ✅ для iOS
    video.preload = "metadata";   // ✅ швидше завантаження
     
  
    // чекаємо завантаження метаданих ДО програвання
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error("Video metadata load error"));
    });
  
 
  
    const scale = Math.min(1, maxWidth / video.videoWidth, maxHeight / video.videoHeight);
    const w = Math.round(video.videoWidth * scale);
    const h = Math.round(video.videoHeight * scale);
  
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    const stream = (canvas as any).captureStream();
  
 
    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(stream, { 
      mimeType, 
      videoBitsPerSecond: quality * 2_000_000 
    });
    recorder.ondataavailable = e => e.data.size && chunks.push(e.data);
    recorder.start();
 
  
    // запускаємо відео після підготовки
    await video.play().catch(() => console.warn("autoplay blocked, continuing muted"));
  
    const fps = 30;
    const interval = 1000 / fps;
  
    const draw = () => {
      ctx.drawImage(video, 0, 0, w, h);
      if (!video.ended && !video.paused) setTimeout(draw, interval);
    };
    draw();
 
  
    await new Promise<void>(res => {
      video.onended = () => {
        recorder.stop();
        res();
      };
    });
  
 
    const compressedBlob: Blob = await new Promise(res => {
      recorder.onstop = () => res(new Blob(chunks, { type: mimeType }));
    });
 
  
    URL.revokeObjectURL(video.src);
    if (compressedBlob.size >= file.size) return file;
 
  
    const ext = mimeType.includes("webm") ? "webm" : "mp4";
    const newName = file.name.replace(/\.[^.]+$/, `.${ext}`);
  
    return new File([compressedBlob], newName, {
      type: mimeType,
      lastModified: Date.now(),
    });
  }
  
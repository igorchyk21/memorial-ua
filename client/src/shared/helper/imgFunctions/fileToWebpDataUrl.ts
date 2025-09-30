export const fileToWebpDataUrl = async (
  file: File,
  quality = 0.8,
  maxW = 2000,
  maxH = 2000
): Promise<string> => {
  // спробуємо прочитати як bitmap/HTMLImage
  const url = URL.createObjectURL(file);
  try {
    // createImageBitmap краще поводиться з EXIF-орієнтацією
    const bmp = await createImageBitmap(await (await fetch(url)).blob());
    const { width, height } = bmp;

    // обрахунок масштабу
    let targetW = width;
    let targetH = height;
    const k = Math.min(1, maxW / width, maxH / height);
    if (k < 1) {
      targetW = Math.round(width * k);
      targetH = Math.round(height * k);
    }

    // малюємо у canvas
    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2D context");
    ctx.drawImage(bmp, 0, 0, targetW, targetH);

    // пробуємо webp
    const blob: Blob | null = await new Promise((res) =>
      canvas.toBlob(res, "image/webp", quality)
    );

    // якщо браузер не підтримує webp — blob=null
    if (!blob) {
      // fallback: оригінал як dataURL
      return await blobToDataUrl(await (await fetch(url)).blob());
    }

    // якщо результат більший за вхідний — краще залишити оригінал
    if (blob.size > file.size) {
      return await blobToDataUrl(await (await fetch(url)).blob());
    }

    return await blobToDataUrl(blob);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}
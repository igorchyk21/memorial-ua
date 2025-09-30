export async function fileToWebpFile(
  file: File,
  quality = 0.8,
  maxW = 2000,  
  maxH = 2000
): Promise<File> {
  // якщо не зображення — повертаємо як є
  if (!file.type.startsWith("image/")) return file;

  const srcUrl = URL.createObjectURL(file);
  try {
    // читаємо як ImageBitmap (краще поводиться з EXIF)
    const blobOriginal = file; // оригінал вже є File
    const bmp = await createImageBitmap(await (await fetch(srcUrl)).blob());
    const { width, height } = bmp;

    // обрахунок масштабу
    const k = Math.min(1, maxW / width, maxH / height);
    const targetW = Math.round(width * k);
    const targetH = Math.round(height * k);

    // якщо масштабування не потрібне і WebP не дасть виграшу — можна одразу віддати оригінал
    // (але залишимо спробу webp нижче — інколи webp дає суттєве зменшення навіть без ресайзу)

    // малюємо у canvas
    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bmp, 0, 0, targetW, targetH);
    if ("close" in bmp) (bmp as any).close?.();

    // пробуємо отримати webp
    const webpBlob: Blob | null = await new Promise((res) =>
      canvas.toBlob(res, "image/webp", quality)
    );

    // якщо браузер не вміє у webp — повертаємо оригінал
    if (!webpBlob) return file;

    // якщо результат більший за вхідний — краще повернути оригінал
    if (webpBlob.size > blobOriginal.size) return file;

    // сформуємо ім'я з .webp
    const webpName = toWebpName(file.name);
    const webpFile = new File([webpBlob], webpName, {
      type: "image/webp",
      lastModified: Date.now(),
    });

    return webpFile;
  } catch {
    // у разі будь-якої помилки — повертаємо оригінал
    return file;
  } finally {
    URL.revokeObjectURL(srcUrl);
  }
}

function toWebpName(name: string): string {
  const i = name.lastIndexOf(".");
  if (i === -1) return `${name}.webp`;
  return `${name.slice(0, i)}.webp`;
}

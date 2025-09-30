export const ensureImageLoads = async (url: string): Promise<boolean> => {
    try {
    await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image failed to load (onerror)."));
        img.src = url;
    });
    return true;
    } catch {
        return false;
    }
};
import fs from "fs/promises";

export const deleteFile = async (fileName:string)
    : Promise<boolean> => {
    
    try {
        await fs.access(fileName); // перевіряє наявність файлу
        await fs.unlink(fileName);
        return true;
    } catch {
        return false;
    }

}
export async function quillPasteImage(this: any) {
    const quill = this.quill;
    const insertDataUrl = (dataUrl: string) => {
        const range = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
        quill.insertEmbed(range.index, "image", dataUrl, "user");
        quill.setSelection(range.index + 1, 0, "user");
    };

    // 1) Спроба прочитати BLOB-картинку з буфера (Chromium/Edge, HTTPS/localhost)
    try {
    // @ts-ignore
    if (navigator.clipboard?.read) {
        // @ts-ignore
        const items = await navigator.clipboard.read();
        for (const item of items) {
        for (const type of item.types) {
            if (type.startsWith("image/")) {
                const blob = await item.getType(type);
                const reader = new FileReader();
                reader.onload = () => insertDataUrl(String(reader.result));
                reader.readAsDataURL(blob);
                return;
            } 
        }
        }
    }
    } catch {
    // ігноруємо — підемо у фолбек нижче
    }

    // 2) Фолбек: читаємо текст з буфера
    try {
 
        // @ts-ignore
    if (navigator.clipboard?.readText) {
         // @ts-ignore
        const text = await navigator.clipboard.readText();
        const trimmed = text.trim();
        const re = /^https?:\/\/.+\.(png|jpe?g|gif|webp)(\?.*)?$/i;

        const range = quill.getSelection(true) || { index: quill.getLength(), length: 0 };

        if (re.test(trimmed)) {
        // якщо це прямий URL картинки
            quill.insertEmbed(range.index, "image", trimmed, "user");
            quill.setSelection(range.index + 1, 0, "user");
        } else if (trimmed.length > 0) {
            // якщо це звичайний текст
            quill.insertText(range.index, trimmed, "user");
            quill.setSelection(range.index + trimmed.length, 0, "user");
        } else {
             
        }
        return;
    }
    } catch(e) {
        console.log(e)
    }

 
}
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import { quillPasteImage } from "./quillPasteImage";
import { onDropCapture, onPasteCapture } from "./quillEvents";
import { setQuillBusy } from "./setQuillBusy";
import { fileToWebpFile } from "@/shared/helper/imgFunctions/fileToWebpFile";
import { fileToWebpDataUrl } from "@/shared/helper/imgFunctions/fileToWebpDataUrl";
import Delta from 'quill-delta';
const WEBP_QUALITY_DEF = 0.8;
const WEBP_MAXWIDTH_DEF = 1200;
const WEBP_MAXHEIGHT_DEF = 1200;

export interface WebpOptimizionType {
    quality?:number;
    maxWidth?:number;
    maxHeight?:number;
}

const useReactQuillSimple = (
  webpOptimizion: WebpOptimizionType | null = null,
  uploadImageFunction?: ((file: File) => Promise<string|null>) | null
) => {

    const webpQuality = webpOptimizion?.quality || WEBP_QUALITY_DEF;
    const maxW = webpOptimizion?.maxWidth || WEBP_MAXWIDTH_DEF;
    const maxH = webpOptimizion?.maxHeight || WEBP_MAXHEIGHT_DEF;

    const rqRef = useRef<ReactQuill | null>(null); // посилання на ReactQuill
    const quillRef = useRef<Quill | null>(null);   // посилання на інстанс Quill
    const [editor, setEditor] = useState<Quill | null>(null);

    // callback-ref, зберігаємо інстанс Quill
    const attachRef = (instance: ReactQuill | null) => {
        rqRef.current = instance;
        const q = instance?.getEditor?.();
        if (q) {
            quillRef.current = q as unknown as Quill;
            setEditor(q as unknown as Quill);
        }
    };

    // handler для кнопки "image": конверт у webp → вставка dataURL
    const imageHandler = useCallback(() => {

        const quill = quillRef.current ?? rqRef.current?.getEditor?.();
        if (!quill) return;

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
            const file = input.files?.[0];
            let dataUrl:string = '';
            if (!file) return;
    
            try {
                setQuillBusy(quill,true); 
                
                if (typeof uploadImageFunction === 'function') {
                    const optimizionWebpFile = await fileToWebpFile(file, webpQuality, maxW, maxH);
                    dataUrl = (await uploadImageFunction(optimizionWebpFile)) || '';
                }
                if (!dataUrl) dataUrl = await fileToWebpDataUrl(file, webpQuality, maxW, maxH);
            } finally {
                setQuillBusy(quill,false);
            }
            const range = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
            quill.insertEmbed(range.index, "image", dataUrl, "user");
            quill.setSelection(range.index + 1, 0, "user");            
        };
        input.click();
    }, [webpQuality, maxW, maxH]);

    // modules поза рендер-петлею (useMemo), щоб не пересоздавались
    const modules = useMemo(
        () => ({
        toolbar: {
            container: [
                [{ header: [3, 4, 5, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote"],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ["clean"],
            ],
            handlers: {
                image:imageHandler,          // наша вставка з конвертацією
                pasteImage: null,  // твій окремий handler, якщо потрібен
            },
        },
    }), [imageHandler]);




    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;

        // 1️⃣ — блокуємо вставку зображень (Ctrl+V, Cmd+V)
        const handlePaste = (e: ClipboardEvent) => {
            if (!e.clipboardData) return;
            const hasImage = [...e.clipboardData.items].some(item =>
                item.type.startsWith("image/")
            );
            if (hasImage) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        // 2️⃣ — блокуємо drag&drop зображень
        const handleDrop = (e: DragEvent) => {
            if (!e.dataTransfer) return;
            const hasImage = [...e.dataTransfer.items].some(item =>
                item.type.startsWith("image/")
            );
            if (hasImage) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        // 3️⃣ — підстраховка: очищаємо <img> у вставленому HTML
        quill.clipboard.addMatcher("IMG", () => new Delta());

        // підписуємося напряму на root — ці події приходять *до* внутрішньої логіки Quill
        const root = quill.root;
        root.addEventListener("paste", handlePaste, true); // capture phase = true
        root.addEventListener("drop", handleDrop, true);

        return () => {
            root.removeEventListener("paste", handlePaste, true);
            root.removeEventListener("drop", handleDrop, true);
        };
    }, [editor]);



  
    return {
        attachRef,
        modules
    }
}

export default useReactQuillSimple;
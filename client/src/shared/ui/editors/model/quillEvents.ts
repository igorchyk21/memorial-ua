import { fileToWebpDataUrl } from "@/shared/helper/imgFunctions/fileToWebpDataUrl";
import { QuillEventOptimizionData } from "../types";
import { setQuillBusy } from "./setQuillBusy";

export const onPasteCapture = async (e: ClipboardEvent, {webpQuality, maxW, maxH, quill}:QuillEventOptimizionData) => {
    if (!e.clipboardData) return;
    const items = Array.from(e.clipboardData.items || []);
    const fileItem = items.find((it) => it.type.startsWith("image/"));
    if (!fileItem) return;

    e.preventDefault();
    e.stopPropagation();
    // деякі плагіни все одно лізуть — добиваємо:
    // @ts-ignore
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();

    const file = fileItem.getAsFile();
    if (!file) return;    

    let dataUrl = '';
    
    try {
        setQuillBusy(quill,true);
        dataUrl = await fileToWebpDataUrl(file, webpQuality, maxW, maxH);
    } finally {
        setQuillBusy(quill,false);
    }       

    const range = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
    quill.insertEmbed(range.index, "image", dataUrl, "user");
    quill.setSelection(range.index + 1, 0, "user");
    
}; 

export const onDropCapture  = async (e: DragEvent, {webpQuality, maxW, maxH, quill}:QuillEventOptimizionData) => {
        
    if (!e.dataTransfer) return;
    const file = Array.from(e.dataTransfer.files || []).find((f) =>
        f.type.startsWith("image/")
    );

    if (!file) return;

    e.preventDefault();
    e.stopPropagation();
    // деякі плагіни все одно лізуть — добиваємо:
    // @ts-ignore
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();

    quill.focus();
    let dataUrl = '';
    
    try {
        setQuillBusy(quill,true);
        dataUrl = await fileToWebpDataUrl(file, webpQuality, maxW, maxH);
    } finally {
        setQuillBusy(quill,false);
    }       
    
    
    const range = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
    quill.insertEmbed(range.index, "image", dataUrl, "user");
    quill.setSelection(range.index + 1, 0, "user");
};
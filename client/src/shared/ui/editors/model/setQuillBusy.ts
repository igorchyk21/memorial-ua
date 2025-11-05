import { Quill } from "react-quill-new";

export const setQuillBusy = (quill: Quill, busy: boolean) => {
  quill.enable(!busy);

  // блокуємо кнопки тулбара
  const tb = (quill.getModule("toolbar") as any)?.container as HTMLElement | undefined;
  if (tb) {
    tb.querySelectorAll<HTMLElement>("button,input,select").forEach(el => {
      (el as HTMLButtonElement).disabled = busy;
    });
  }

  // шукаємо спільний wrapper (батько тулбара і контейнера)
  const wrapper = tb?.parentElement || quill.root.parentElement?.parentElement;
  if (wrapper) {
    let overlay = wrapper.querySelector<HTMLDivElement>(".quill-busy-overlay");
    if (busy) {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "quill-busy-overlay";
        wrapper.style.position = "relative"; // для абсолютного позиціювання
        wrapper.appendChild(overlay);
      }
    } else {
      overlay?.remove();
    }
  }
};

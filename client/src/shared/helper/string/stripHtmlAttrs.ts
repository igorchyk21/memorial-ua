/**
 * Видаляє або залишає style/class атрибути з HTML, завжди видаляє data-*
 * @param html Вхідний HTML
 * @param allowStyle Чи дозволяти зберігати style-атрибути
 * @param allowClass Чи дозволяти зберігати class-атрибути
 * @returns Очищений HTML
 */
export function stripHtmlAttrs(
  html: string,
  allowStyle: boolean = false,
  allowClass: boolean = false
): string {
  const doc = new DOMParser().parseFromString(html, "text/html");

  if (!doc.body) return html;

  const walk = (el: Element) => {
    // style
    if (!allowStyle && el.hasAttribute("style")) {
      el.removeAttribute("style");
    }
    // class
    if (!allowClass && el.hasAttribute("class")) {
      el.removeAttribute("class");
    }
    // data-*
    [...el.attributes].forEach(attr => {
      if (attr.name.startsWith("data-")) {
        el.removeAttribute(attr.name);
      }
    });

    [...el.children].forEach(child => walk(child));
  };

  [...doc.body.children].forEach(el => walk(el));

  return doc.body.innerHTML;
}

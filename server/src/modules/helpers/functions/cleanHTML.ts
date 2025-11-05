export function cleanHTML(html: string): string {
  if (!html) return '';

  return html
    // Видаляє <script>…</script> (навіть якщо з атрибутами або переведенням рядка)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

    // Видаляє inline-обробники подій (onclick, onload, onerror тощо)
    .replace(/\s+on\w+="[^"]*"/gi, '')
    .replace(/\s+on\w+='[^']*'/gi, '')
    .replace(/\s+on\w+=\S+/gi, '')

    // Видаляє порожні теги, крім <iframe>
    .replace(/<(?!iframe)(\w+)[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi, '')
    .replace(/<(?!iframe)(\w+)[^>]*>(?:\s|&nbsp;)*<\/\1>/gi, '');
}

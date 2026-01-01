export function parseYouTubeUrl(url: string): {
  valid: boolean;
  videoId?: string | null;
  embedUrl?: string;
  reason?: string;
} {
  if (!url) return { valid: false, reason: "Empty URL" };

  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace("www.", "");

    let videoId: string | null = null;

    // 🔹 Основні формати
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/")[2];
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2];
      } else if (parsed.pathname.startsWith("/live/")) {
        videoId = parsed.pathname.split("/")[2];
      }
    }

    // 🔹 Короткі посилання
    else if (host === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    }

    const isValidId = !!videoId && /^[a-zA-Z0-9_-]{6,15}$/.test(videoId);
    if (!isValidId) {
      return { valid: false, reason: "Invalid or unsupported YouTube URL" };
    }

    return {
      valid: true,
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };
  } catch {
    return { valid: false, reason: "Invalid URL format" };
  }
}

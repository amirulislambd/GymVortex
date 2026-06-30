const SITE_URL = "https://gymvortex.vercel.app";
// Backend API URL — production value from env or fallback
const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://gymvortex-backend.vercel.app";

export default async function sitemap() {
  // ── Static public pages ────────────────────────────────────────────────────
  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/classes`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/forum`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/login`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/register`, changeFrequency: "monthly", priority: 0.4 },
  ];

  // ── Dynamic: individual class pages ───────────────────────────────────────
  let classRoutes = [];
  try {
    const res = await fetch(`${API_URL}/classes`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const classes = Array.isArray(data) ? data : (data.classes ?? []);
      classRoutes = classes.map((cls) => ({
        url: `${SITE_URL}/classes/${cls._id}`,
        changeFrequency: "weekly",
        priority: 0.7,
        lastModified: cls.updatedAt ? new Date(cls.updatedAt) : new Date(),
      }));
    }
  } catch (_) {
    // silently skip if backend is unreachable during build
  }

  // ── Dynamic: individual forum post pages ──────────────────────────────────
  let forumRoutes = [];
  try {
    const res = await fetch(`${API_URL}/forum`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const posts = Array.isArray(data) ? data : (data.posts ?? []);
      forumRoutes = posts.map((post) => ({
        url: `${SITE_URL}/forum/${post._id}`,
        changeFrequency: "weekly",
        priority: 0.6,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      }));
    }
  } catch (_) {
    // silently skip if backend is unreachable during build
  }

  return [...staticRoutes, ...classRoutes, ...forumRoutes];
}


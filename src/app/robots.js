const BASE_URL = "https://gymvortex.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        // Allow Google and all bots to crawl public pages
        userAgent: "*",
        allow: ["/", "/classes", "/forum", "/login", "/register"],
        disallow: [
          "/dashboard/",   // all dashboard routes are private
          "/api/",         // no need to index API routes
          "/forbidden",
          "/unauthorized",
          "/success",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

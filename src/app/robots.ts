import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard/", "/login", "/signup"],
    },
    sitemap: "https://www.albatrosia.com/sitemap.xml",
    host: "https://www.albatrosia.com",
  };
}

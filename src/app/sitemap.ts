import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: brand.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${brand.url}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${brand.url}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}

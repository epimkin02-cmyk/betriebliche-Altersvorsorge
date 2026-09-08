import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Nur WebP, kein AVIF.
     *
     * Standardmaessig versucht Next zuerst AVIF, wenn der Browser es annimmt.
     * Bei unserem freigestellten Box-PNG (RGBA mit Alpha, 656 x 900) blieb die
     * AVIF-Kodierung haengen: Anfrage ohne Accept-Header lieferte das Bild in
     * 4 ms, dieselbe URL mit "Accept: image/avif,image/webp" lief in einen
     * Timeout. Das Bild erschien dadurch im Hero gar nicht.
     *
     * WebP kann ebenfalls Transparenz, ist deutlich schneller zu kodieren und
     * wird von allen Zielbrowsern unterstuetzt. Der Groessenvorteil von AVIF
     * ist den Aufwand hier nicht wert.
     */
    formats: ["image/webp"],
  },
};

export default nextConfig;

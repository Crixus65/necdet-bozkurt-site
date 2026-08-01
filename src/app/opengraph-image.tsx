import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 50%, #E8F0FE 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            MM
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#1565C0" }}>
              SERBEST MUHASEBECİ MALİ MÜŞAVİR
            </span>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#1E293B", marginTop: 8 }}>
              Necdet Bozkurt
            </span>
          </div>
        </div>
        <p style={{ fontSize: 24, color: "#64748B", maxWidth: 800, lineHeight: 1.5 }}>
          Muhasebe · Vergi Danışmanlığı · Şirket Kuruluşu · SGK İşlemleri
        </p>
      </div>
    ),
    { ...size },
  );
}

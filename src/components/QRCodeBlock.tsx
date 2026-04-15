"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRCodeBlock({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 180,

      color: {
        dark: "#b48c1e",   // 🟡 TON OR EXACT (RGB 180,140,30)
        light: "#0b0b12",  // fond noir doux (important pour scan)
      },

      margin: 1,
    }).then(setDataUrl);
  }, [url]);

  return (
    <img
      src={dataUrl}
      alt="QR Code"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "12px",
      }}
    />
  );
}
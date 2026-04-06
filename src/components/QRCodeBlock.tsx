"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRCodeBlock({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 180,

      // 🎨 COULEURS PREMIUM
      color: {
        dark: "#d7b56d",   // gold
        light: "#0b0b12",  // fond noir léger (PAS pur noir)
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
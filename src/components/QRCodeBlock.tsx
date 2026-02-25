"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRCodeBlock({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    QRCode.toDataURL(url, { errorCorrectionLevel: "H", margin: 1, scale: 6 })
      .then((u) => mounted && setDataUrl(u))
      .catch(() => mounted && setDataUrl(""));
    return () => {
      mounted = false;
    };
  }, [url]);

  if (!dataUrl) return <small style={{ color: "rgba(255,255,255,.68)", padding: 12 }}>Generating QR…</small>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={dataUrl} alt={`QR code to ${url}`} style={{ width: 140, height: 140 }} />
  );
}
import "./globals.css";

export const metadata = {
  title: "HORUUM — Power is not given. It is awakened.",
  description: "HORUUM — A premium ritual experience. Power is not given. It is awakened.",
  metadataBase: new URL("https://horuum.com"),
  openGraph: {
    title: "HORUUM",
    description: "Power is not given. It is awakened.",
    url: "https://horuum.com",
    siteName: "HORUUM",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
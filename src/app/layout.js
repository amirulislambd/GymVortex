import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "GymVortex — Industrial Athletics",
  description: "Book elite classes, train with world-class coaches.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400;0,600;0,700;0,800;1,700;1,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ background: "#131313", color: "#e5e2e1", minHeight: "100vh" }}
      >
        {children}
        <Toaster
          position="top-center"
          containerStyle={{
            zIndex: 10005,
          }}
          toastOptions={{
            style: {
              background: "#0c0c0c",
              color: "#fff",
              border: "1px solid #27272a",
              fontFamily: "monospace",
              fontSize: "12px",
              borderRadius: "0px",
            },
          }}
        />
      </body>
    </html>
  );
}

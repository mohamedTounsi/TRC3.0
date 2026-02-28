"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1a1f3a",
          color: "#fff",
          border: "1px solid rgba(157,146,125,0.2)",
        },
        success: {
          iconTheme: {
            primary: "#efb073",
            secondary: "#000",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
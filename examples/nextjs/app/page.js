// The "use client" directive is necessary for using React hooks like useRef or useEffect.
// Without it, Next.js will throw a build error since hooks are not supported
// in server components.

"use client";

import React, { useEffect, useRef } from "react";

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const { PSPDFKit } = window;
    if (container && PSPDFKit) {
      PSPDFKit.load({
        container,
        document: "/example.pdf",
        // baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    }

    return () => {
      PSPDFKit?.unload(container);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ height: "100vh" }} />
      <style global jsx>
        {`
          * {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  );
}

"use client";

import DomeGallery from "@/components/DomeGallery";
import CurvedLoop from "@/components/CurvedLoop";

export default function Home() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <CurvedLoop
          marqueeText="최지은 ✦ ESTP ✦ 2팀 ✦ 지선사 ✦"
          speed={2}
          curveAmount={100}
          direction="right"
          interactive={true}
          className="custom-text-style"
        />
      </div>

      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <DomeGallery openedImageWidth="auto" openedImageHeight="70vh" />
      </div>
    </main>
  );
}

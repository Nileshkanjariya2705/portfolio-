import { ImageResponse } from "next/og";
export const alt =
  "Nilesh Kanjariya — Full Stack Developer & Digital Product Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f5f8ff",
        color: "#101d36",
        width: "100%",
        height: "100%",
        padding: "65px 75px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
        }}
      >
        <span style={{ fontWeight: 700 }}>Nilesh Kanjariya</span>
        <span style={{ color: "#61738e" }}>DEVELOPER & PRODUCT PARTNER</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 83,
          fontWeight: 700,
          letterSpacing: -4,
          lineHeight: 1.08,
        }}
      >
        <span>I build digital products.</span>
        <span style={{ color: "#2563eb" }}>You move forward.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#61738e",
        }}
      >
        <span>FULL STACK · SAAS · AI & AUTOMATION</span>
        <span>Ahmedabad, India → Everywhere</span>
      </div>
    </div>,
    { ...size },
  );
}

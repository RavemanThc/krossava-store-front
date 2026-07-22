"use client";

import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScaleLoader color="#000" height={35} width={4} radius={2} margin={2} />
    </div>
  );
}

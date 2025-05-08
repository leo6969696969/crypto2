import React from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32 }}>Welcome to Crypto Platform</h1>
      <button onClick={() => router.push("/login")}>Login</button>
      <button onClick={() => router.push("/register")} style={{ marginLeft: 10 }}>
        Register
      </button>
    </div>
  );
}

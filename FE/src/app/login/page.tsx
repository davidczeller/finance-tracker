"use client";

import React, { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const handleLogin = () => {
    console.log("Login");
  };

  return (
    <div>
      {isLogin ? (
        <>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <button onClick={handleLogin}>Register</button>
        </>
      )}
    </div>
  );
}

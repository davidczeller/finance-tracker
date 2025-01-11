"use client";

import api from "@/lib/api";
import React, { useState } from "react";
import { User } from "../users/page";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [newUser, setNewUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await api.get("/users");
  //     setUsers(response.data);
  //   } catch (error) {
  //     setError("Failed to fetch users");
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const handleLogin = async () => {
    try {
      const payload = {
        grant_type: "password",
        username: newUser?.email,
        password: newUser?.password,
      };
      console.log({ payload });
      const response = await api.post("/auth/token", payload);
      console.log(response.data);
    } catch (error: any) {
      console.log({ error });
      setError(`Failed to login: ${error.response.data.message}`);
    }
  };

  const createUser = async () => {
    try {
      const response = await api.post("/users", {
        name: newUser?.name,
        email: newUser?.email,
        password: newUser?.password,
        // password2: newUser?.password2,
      });
      console.log(response.data);
      // fetchUsers();
      setNewUser(null);
      setIsLogin(true);
    } catch (error: any) {
      console.log({ error });
      setError(`Failed to create user: ${error.response.data.message}`);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {isLogin ? (
        <>
          <input
            type="text"
            placeholder="Email"
            onChange={e =>
              setNewUser({
                name: "",
                email: e.target.value,
                password: newUser?.password || "",
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e =>
              setNewUser({
                name: "",
                email: newUser?.email || "",
                password: e.target.value,
              })
            }
          />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Name"
            onChange={e =>
              setNewUser({
                name: e.target.value,
                email: newUser?.email || "",
                password: newUser?.password || "",
              })
            }
          />
          <input
            type="text"
            placeholder="Email"
            onChange={e =>
              setNewUser({
                name: newUser?.name || "",
                email: e.target.value,
                password: newUser?.password || "",
              })
            }
          />
          <input
            type="text"
            placeholder="Password"
            onChange={e =>
              setNewUser({
                name: newUser?.name || "",
                email: newUser?.email || "",
                password: e.target.value,
              })
            }
          />
          <button onClick={createUser}>Register</button>
        </>
      )}
      <p>
        <button onClick={() => (isLogin ? setIsLogin(false) : setIsLogin(true))}>
          {isLogin ? " You don't have an account yet? Register!" : "Do you already have an account? Login!"}
        </button>
      </p>
    </div>
  );
}

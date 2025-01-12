"use client";

import api from "@/lib/api";
import React, { useState } from "react";
import { User } from "../users/page";
import { Button, Container, Input } from "./styles.login";

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
    <Container>
      <h1 style={{ textAlign: "center", color: "#5C8A5C" }}>Moneytor</h1>
      {isLogin ? (
        <>
          <Input
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
          <Input
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
          <Button onClick={handleLogin}>Login</Button>
        </>
      ) : (
        <>
          <Input
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
          <Input
            type="email"
            placeholder="Email"
            onChange={e =>
              setNewUser({
                name: newUser?.name || "",
                email: e.target.value,
                password: newUser?.password || "",
              })
            }
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={e =>
              setNewUser({
                name: newUser?.name || "",
                email: newUser?.email || "",
                password: e.target.value,
              })
            }
          />
          <Button onClick={createUser}>Register</Button>
        </>
      )}

      {isLogin ? (
        <div>
          You don't have an account yet? &nbsp;
          <span onClick={() => setIsLogin(false)} style={{ color: "red", cursor: "pointer" }}>
            Register!
          </span>
        </div>
      ) : (
        <div>
          Do you already have an account? &nbsp;
          <span onClick={() => setIsLogin(true)} style={{ color: "green", cursor: "pointer" }}>
            Login!
          </span>
        </div>
      )}
    </Container>
  );
}

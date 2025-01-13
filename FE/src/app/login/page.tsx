"use client";

import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { User } from "../users/page";
import { Button, Container, InnerContainer, Input } from "./styles.login";
import { useRouter } from "next/navigation";
import { Spinner } from "../components/Spinner";
type UserWithToken = {
  access_token: string;
  refresh_token: string;
  email: string;
  name: string;
};

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [newUser, setNewUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      router.push("/");
    }
    setIsCheckingAuth(false);
  }, []);

  const updateUser = (field: keyof User, value: string) => {
    setError(null);
    setNewUser(prev => ({
      name: field === "name" ? value : prev?.name || "",
      email: field === "email" ? value : prev?.email || "",
      password: field === "password" ? value : prev?.password || "",
    }));
  };

  const handleLocalStorage = (user: UserWithToken) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const payload = {
        grant_type: "password",
        username: newUser?.email,
        password: newUser?.password,
      };
      const response = await api.post("/auth/token", payload);
      const { token, refreshToken, name, email, id } = response.data;
      const user = { name, email, id, access_token: token, refresh_token: refreshToken };
      handleLocalStorage(user);
      router.push("/");
    } catch (error: any) {
      setError(`Failed to login: ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async () => {
    try {
      const response = await api.post("/api/users", {
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

  if (isCheckingAuth) {
    return null;
  }

  return (
    <Container>
      <InnerContainer>
        <h1 style={{ textAlign: "center", color: "#5C8A5C" }}>Moneytor</h1>
        {isLogin ? (
          <>
            <Input
              type="text"
              placeholder="Email"
              autoFocus
              disabled={isLoading}
              onChange={e => updateUser("email", e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              disabled={isLoading}
              onChange={e => updateUser("password", e.target.value)}
            />
            <Button disabled={isLoading} onClick={handleLogin}>
              {isLoading ? (
                <>
                  <Spinner /> Login
                </>
              ) : (
                "Login"
              )}
            </Button>
          </>
        ) : (
          <>
            <Input type="text" placeholder="Name" onChange={e => updateUser("name", e.target.value)} />
            <Input type="email" placeholder="Email" onChange={e => updateUser("email", e.target.value)} />
            <Input type="password" placeholder="Password" onChange={e => updateUser("password", e.target.value)} />
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
        <div style={{ color: "red", position: "absolute", bottom: "-1rem" }}>{error}</div>
      </InnerContainer>
    </Container>
  );
}

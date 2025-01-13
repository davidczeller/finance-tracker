"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./login/styles.login";
import { Spinner } from "./components/Spinner";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return user ? (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Hello {user.name}!</h2>
      </main>
      <footer className={styles.footer}>
        <Button onClick={logout}>
          <Image aria-hidden src="/logout.svg" alt="Logout" width={16} height={16} />
          &nbsp; Log Out
        </Button>
      </footer>
    </div>
  ) : null;
}

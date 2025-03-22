import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function AuthPage() {
  const [hasUser, setHasUser] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`);
        const data = await res.json();
        setHasUser(data.hasUser);
      } catch (error) {
        console.error("Error fetching user status:", error);
        setHasUser(false);
      }
    };

    fetchUserStatus();
  }, []);

  if (hasUser === null) return <p>Loading...</p>;

  return hasUser ? <LoginForm /> : <SignupForm />;
}

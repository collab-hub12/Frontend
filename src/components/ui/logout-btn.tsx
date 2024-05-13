"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  async function logoutHandler() {
    try {
      router.push(`${process.env.BACKEND_URL}/auth/logout`);
    } catch (err) {
      console.log(err);
    }
  }
  return <></>;
};

export default LogoutButton;

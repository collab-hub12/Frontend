"use server";
import {redirect} from "next/navigation";

export const LogoutHandler = async () => {
    redirect(`${process.env.BACKEND_URL}/auth/logout`);
};

export const LoginHandler = async () => {
    redirect(`${process.env.BACKEND_URL}/auth/google/callback`);
};


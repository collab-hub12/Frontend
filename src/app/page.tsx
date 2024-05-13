import Image from "next/image";
import React from "react";
import { Usages } from "../../public/assets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { LoginHandler } from "@/actions/auth.action";

export default async function Home() {
  const session = await getSession();

  if (session) redirect("/orgs");

  return (
    <div className="flex justify-between w-full items-center">
      <Card className="w-full flex m-10">
        <div className="flex flex-col w-full h-full rounded-md">
          <Image src={Usages.Auth} alt="auth" className="rounded-lg" />
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-20 pr-10">
          <div className="flex flex-col gap-2">
            <h1 className="flex font-bold text-3xl">Create account</h1>
            <p className="flex text-base">
              Already have an account?
              <span className="text-grey pl-1"> Login</span>
            </p>
          </div>
          <div className="flex flex-col items-center w-full px-10 gap-4">
            <form className="flex flex-col gap-4 w-full">
              <div className="flex gap-2 w-full">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <div className="flex gap-2 w-full">
                <Input type="email" placeholder="Email" />
              </div>
              <div className="flex gap-2 w-full">
                <Input type="password" placeholder="Password" />
              </div>
              <Link href="/initially">
                <Button className="py-6 w-full">Create Account</Button>
              </Link>
            </form>
            <p>or</p>
            <form action={LoginHandler}>
              <Button variant="outline" className="w-full py-6" type="submit">
                <span className="px-4">Continue with Google</span>
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                ></img>
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}

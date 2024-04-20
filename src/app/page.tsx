import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import React from "react";
import { Usages } from "../../public/assets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className='flex justify-between w-full items-center'>
      <div className='flex flex-col w-full'>
        <Image src={Usages.Auth} alt='auth' />
      </div>
      <div className='flex flex-col items-center w-full gap-20 pr-10'>
        <div className='flex flex-col gap-2'>
          <h1 className='flex font-bold text-3xl'>Create account</h1>
          <p className='flex text-base'>
            Already have an account?
            <span className='text-[#9C9C9D] pl-1'> Login</span>
          </p>
        </div>
        <div className='flex flex-col w-full px-10'>
          <form className='flex flex-col gap-4'>
            <div className='flex gap-2 w-full'>
              <Input type='email' placeholder='First Name' />
              <Input type='email' placeholder='Last Name' />
            </div>
            <div className='flex gap-2 w-full'>
              <Input type='email' placeholder='Email' />
            </div>
            <div className='flex gap-2 w-full'>
              <Input type='password' placeholder='Password' />
            </div>
            <Button className=''>Create Account</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

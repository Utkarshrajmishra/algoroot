"use client"
import { LoginForm } from "@/components/authentication/login";
import { SignupForm } from "@/components/authentication/signup";
import { useState } from "react";

const Page = () => {
  const [login,setLogin]=useState<boolean>(true)
  return (
    <section className="min-h-screen p-2 md:p-0 flex items-center justify-center w-screen bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
      {login?<LoginForm setLogin={setLogin}/>:<SignupForm setLogin={setLogin}/>}
    </section>
  );
};

export default Page;

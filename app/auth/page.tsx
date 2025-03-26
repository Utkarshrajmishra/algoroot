import {  LoginForm } from "@/components/authentication/login";
import { SignupForm } from "@/components/authentication/signup";

const Page=()=>{
    return (
      <section className="min-h-screen p-2 md:p-0 flex items-center justify-center w-screen bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
          <SignupForm />
      </section>
    );
}

export default Page
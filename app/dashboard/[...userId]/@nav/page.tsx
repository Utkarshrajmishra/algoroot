"use clinet"
import Profile from "@/components/profile/profile";
import { useSidebar } from "@/context/sidebar-context";
import { Menu } from "lucide-react";


const Nav = () => {
  const {toggleMobileMenu}=useSidebar()
  
  return (
    <div className="flex items-center justify-between w-full h-[75px] px-4 border-b border-b-zinc-700">
      <p className="text-xl text-zinc-200 font-[500] hidden lg:inline-block">Dashboard</p>
      <Menu className="lg:hidden size-8 text-zinc-200" onClick={toggleMobileMenu}/>
      <Profile/>
    </div>
  );
};

export default Nav;

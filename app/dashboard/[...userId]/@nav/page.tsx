
import Profile from "@/components/profile/profile";

const Nav = () => {
  
  return (
    <div className="flex items-center justify-between w-full h-[75px] px-4 border-b border-b-zinc-700">
      <p className="text-xl text-zinc-200 font-[500]">Dashboard</p>
      <Profile/>
    </div>
  );
};

export default Nav;

import { AuthProvider } from "@/context/auth-context";
import Nav from "./@nav/page";
import Sidebar from "./@sidebar/page";
import { Toaster } from "@/components/ui/sonner";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {" "}
      <AuthProvider>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full p-">
              <div className="bg-black/20 border-b h-[75px] flex items-center border-b-zinc-800 w-full ">
                <Nav />
              </div>

              {children}
            </div>{" "}
          </div>
        </div>
      </AuthProvider>
      <Toaster/>
    </>
  );
};

export default Layout;

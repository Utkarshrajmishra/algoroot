import Sidebar from "./@sidebar/page";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>{" "}
      </div>
    </div>
  );
};

export default Layout;

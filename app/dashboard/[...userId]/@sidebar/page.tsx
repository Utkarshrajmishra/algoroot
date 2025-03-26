"use client";

import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronDown,
  Home,
  BadgeIcon as IdCard,
  Library,
  Plus,
  Settings,
} from "lucide-react";

const Menu = [
  {
    id: 1,
    name: "Dashboard",
    icon: <Home className="size-[18px]" />,
  },
  {
    id: 2,
    name: "My Library",
    icon: <Library className="size-[18px]" />,
  },
  {
    id: 3,
    name: "Notifications",
    icon: <Bell className="size-[18px]" />,
    badge: 3,
  },
  {
    id: 4,
    name: "Settings",
    icon: <Settings className="size-[18px]" />,
  },
  {
    id: 5,
    name: "Billing",
    icon: <IdCard className="size-[18px]" />,
  },
];

const Sidebar = () => {
  return (
    <div className="w-[280px] bg-black/20 border-r border-r-zinc-800 flex flex-col h-screen justify-between">
      <div>
        <div className="flex-none px-4 py-4">
          <section className="w-full bg-zinc-900 hover:bg-zinc-800/50 transition-all duration-200 border border-zinc-800/30 rounded-lg p-2.5 flex items-center justify-between group">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-300 group-hover:text-white">
                Utkarsh&apos;s Workspace
              </span>
            </div>
            <ChevronDown className="size-4 text-zinc-500 group-hover:text-zinc-400" />
          </section>
        </div>

        <div className="border-t border-neutral-800" />
        <div className="flex-none mt-2 px-4 space-y-6">
          <div>
            <h2 className="px-2 text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-2">
              Menu
            </h2>
            <nav className="space-y-1">
              {Menu?.map((item, index) => (
                <button
                  key={item.id}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-[6px] rounded-lg text-sm transition-all text-zinc-500 duration-200",
                    index === 0
                      ? "bg-zinc-900/20 border border-neutral-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-300"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-emerald-900 text-white text-xs font-medium p-1 rounded-full"></span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex-none p-4 border-t border-zinc-800/30 bg-zinc-900/20">
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/30 transition-all duration-200">
          <div className="size-9 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center ring-2 ring-zinc-800">
            <span className="text-sm font-medium text-white">U</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-white">Utkarsh</p>
            <p className="text-xs text-zinc-500">utkarsh@example.com</p>
          </div>
          <ChevronDown className="size-4 text-zinc-500" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

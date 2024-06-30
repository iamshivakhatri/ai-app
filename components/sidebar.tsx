"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Layout, LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings } from "lucide-react";


import {cn} from  '@/lib/utils';
import { usePathname } from "next/navigation";
import {FreeCounter} from "./free-counter";

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}
const montserrat = Montserrat(
    {
        weight: "600",
        subsets: ["latin"],
    }
);

const routes = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-500"
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        href: "/video",
        color: "text-green-500"
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: 'Code Generation',
        icon: Code,
        href: "/code",
        color: "text-orange-500"
    },
    {
        label: 'Settings',
        icon: Settings,
        href: "/settings",
    }
]

const Sidebar = ({apiLimitCount = 0, isPro=false}: SidebarProps) => {
    const pathname = usePathname();
    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            src="/logo.png"
                            alt="logo"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                        Genius
                    </h1>

                </Link>
                <div className="space-y-1">
                    {routes.map((route, index) => (
                        <Link key={route.href} href={route.href}
                         className={ cn("text-sm group flex p-3  w-full justify-start font-medium  hover:text-white hover:bg-white/10 rounded-lg transition", 
                            pathname === route.href ? "bg-white/10 text-white" : "text-white"

                        )}>
                            <div className="flex items-center flex-1"> 
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                            {route.label}
                            </div>

                        </Link>
                    ))}

                </div>

            </div>
            <FreeCounter
                apiLimitCount={apiLimitCount}
                isPro={isPro}
            />
        </div>
     );
}

export default Sidebar;
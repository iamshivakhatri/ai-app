"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const font = Montserrat({
    weight: "600",
    subsets:["latin"]
})
export const LandingNavbar = () => {
    const {isSignedIn} = useAuth();
    return(
        <nav className="bg-transparent p-4  flex items-center justify-between ">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image src="/logo.png" layout="fill" alt="Logo"/>
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>Genius</h1>
            </Link>
            <div className="">
                <Link href={isSignedIn? "/dashboard": "/sign-up"}>
                <Button variant="outline" className="rounded-full">
                    Get Started
                </Button>
                </Link>
                
            </div>
        </nav>
    )
}
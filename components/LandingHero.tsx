"use client";

import { useAuth } from "@clerk/nextjs";
import TypeWriterComponent from "typewriter-effect"
import { Button } from "./ui/button";
import Link from "next/link";
export const LandingHero = ()=>{    
    const isSignedIn = useAuth();

    return(
    <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:tex-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
           <h1>The Best AI Tool For Content Generation.</h1>  
           <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <TypeWriterComponent
            options={{
                strings: ['Generate Text', 'Generate Music', 'Generate Code', 'Generate Image', 'Generate Video'],
                autoStart: true,
                loop: true,
            }}
            
            />

           </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
            Generate Content 10x Faster with your AI
        </div>
        <div>
            <Link href={isSignedIn? "/dashboard": "/sign-up"}> 
                <Button variant="premium">
                    Try For Free
                </Button>
            </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
            No Credit Card Required
        </div>
    </div>

    )
   
}
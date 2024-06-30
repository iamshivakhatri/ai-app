"use client";

import { useAuth } from "@clerk/nextjs";

export const LandingHero = ()=>{
    const isSignedIn = useAuth();

    return(
    <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:tex-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            The Best AI Tool For Content Generation.
        </div>
    </div>

    )
   
}
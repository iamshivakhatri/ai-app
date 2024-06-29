"use client";

import { useEffect, useState } from "react";
import {Card, CardContent} from "@/components/ui/card"
import { MAX_FREE_COUNTS } from "@/constant";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
    apiLimitCount: number;
}

export const FreeCounter = ({apiLimitCount = 0}: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return ( 
        <div className="px-3 ">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4">
                        <p>{apiLimitCount}/{MAX_FREE_COUNTS} Free Generations</p>
                        <Progress value={(apiLimitCount/MAX_FREE_COUNTS) * 100} max={MAX_FREE_COUNTS} className="mt-2"/>
                    </div>
                    <Button className="w-full" variant="premium">
                        Upgrade
                        <Zap className="h-5 w-5 ml-2 fill-white"/>
                    </Button>
                   
                </CardContent>
            </Card>
        </div>
     );
}
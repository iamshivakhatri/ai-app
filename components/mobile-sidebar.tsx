"use client";

import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import Sidebar from "@/components/sidebar";

interface MobileSidebarProps {
    apiLimitCount: number;
}

const MobileSidebar = ({apiLimitCount}: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return ( 
        <Sheet>
        <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
            <Menu size={24}/>
        </Button>
        </SheetTrigger>
        <SheetContent side = "left" className="p-0 m-0">
            <Sidebar apiLimitCount={apiLimitCount}/>
        </SheetContent>
        </Sheet>
     );
}
 
export default MobileSidebar;
"use client";

import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(()=>{
        Crisp.configure("75714684-d6d9-4c07-947f-b54bbc987ae7");
    },[])
    return null;
}
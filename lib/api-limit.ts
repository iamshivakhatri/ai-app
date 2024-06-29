import {auth} from '@clerk/nextjs/server';

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from '@/constant';

export const increaseApiLimit = async (req: Request) => {
    const {userId} = auth();
    if(!userId){
        return false;
    }
    const userApiLimit = await  prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if(userApiLimit){
        await prismadb.userApiLimit.update({
            where: {
                userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        });
    }else{
        await prismadb.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        });
    }

}

export const checkApiLimit = async (req: Request) => {
    const {userId} = auth();
    if(!userId){
        return false;
    }
    const userApiLimit = await  prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if(userApiLimit && userApiLimit.count >= MAX_FREE_COUNTS){
        return false;
    }

    return true;

}
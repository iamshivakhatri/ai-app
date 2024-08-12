import {auth} from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const {userId} = auth();
    console.log("This is the userId", userId);
    
    if (!userId) return false; 

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeCurrentPeriodEnd: true,
            stripeSubscriptionId: true,
            stripeCustomerId: true,
            stripePriceId: true

        }
    });

    if (!userSubscription) return false;

    const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
}
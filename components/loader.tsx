import Image from "next/image";

export const Loader = () => {
    return ( 
        <div className="flex flex-col justify-content items-center p-20 h-full">
            <div className="w-10 h-10 relative animate-spin">
                <Image src="/loader.png" layout="fill" objectFit="contain" alt="Loader" />
            </div>
            <p className="text-sm text-muted-foreground">
                Your response is cooking...
            </p>

        </div>
     );
}
 

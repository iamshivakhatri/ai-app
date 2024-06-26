import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";

export const BotAvatar = () => {
    return (  
        <Avatar className="h-12 w-12">
            <AvatarImage src="/bot.png"  />
        </Avatar>
    );
}
 

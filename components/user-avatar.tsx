import {useUser} from "@clerk/nextjs";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const UserAvatar = () => {
    const user = useUser();
    return (
        <Avatar>
            <AvatarImage src={user?.user?.imageUrl}  />
            <AvatarFallback>
                {user?.user?.firstName?.charAt(0)}
                {user?.user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
        
    );
};

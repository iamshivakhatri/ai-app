"use client";
import {Heading} from "@/components/heading";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constant";


const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })
    return ( 
        <div>
            <Heading 
             title="Conversation"
             description="AI which can do anything"
             icon={MessageSquare}
             iconColor="text-violet-500"
             bgColor="bg-violet-500/10"
            /> 
            <div className="px-4 lg:px-8">

            </div>
        </div>
     );
}
 
export default ConversationPage;
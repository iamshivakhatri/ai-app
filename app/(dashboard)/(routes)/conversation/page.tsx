"use client";
import {Heading} from "@/components/heading";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import { useState } from "react";
import {increaseApiLimit, checkApiLimit} from "@/lib/api-limit";

import { formSchema } from "./constant";
import { Form, FormField, FormItem, FormControl} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import {cn} from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

type Message = {
    role: "user" | "assistant";
    content: string;
  };


const ConversationPage = () => {
    
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values);

        try{
            const userMessage:Message = {
                role: "user",
                content: values.prompt
              };


            const newMessages = [...messages, userMessage];


            const response = await axios.post("/api/conversation", {
                messages: newMessages
            });
            setMessages((current) => [...current, userMessage, response.data]);


            form.reset();

        }catch(e: any){
            // TODO: Open Pro Modal
            if(e?.response?.status === 403){
                proModal.onOpen();
            }else{
                toast.error("Something went wrong")
            }
            console.log("[onSubmit]",e);
        }finally{
            router.refresh();
        }
    }
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
                <div>
                    <Form {...form} >
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >

                            <FormField name="prompt" render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-10 ">
                                    <FormControl className="m-0 p-0">
                                      <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                       disabled={isLoading}
                                       placeholder="How can I use Nextjs?"
                                       {...field}
                                      />
                                     </FormControl>
                                </FormItem>

                            )}
                            
                            />

                            <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>
                                Generate
                            </Button>


                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 bg-muted rounded-lg w-full ">
                            <Loader />
                        </div>
                        
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No Conversation Started"/>
                        )}
                <div className="flex flex-col gap-y-4">
                    {messages.map((message, index) => (
                    <div key={index} className={cn("p-8 w-full rounded-lg flex items-start gap-x-8", message.role === "user"? "bg-white border-black/10": "bg-muted")}>
                        {/* <strong>{message.role === "user" ? <UserAvatar/> : <BotAvatar/>}:</strong> {message.content} */}
                        {message.role === "user" ? <UserAvatar/> : <BotAvatar/>} {message.content}
                        {message.content}
                    </div>
                    ))}
          </div>
                </div>

            </div>
        </div>
     );
}
 
export default ConversationPage;
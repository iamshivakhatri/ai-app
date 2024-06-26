"use client";
import {Heading} from "@/components/heading";
import * as z from "zod";
import { Divide, Code} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

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


const CodePage = () => {
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
        

            const response = await axios.post("/api/code", {
                messages: newMessages
            });
            setMessages((current) => [...current, userMessage, response.data]);


            form.reset();

        }catch(e: any){
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
             title="Code Generation"
             description="AI which generated the code"
             icon={Code}
             iconColor="text-orange-500"
             bgColor="bg-orange-500/10"
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
                                       placeholder="How to connect openai api with Next.js?"
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
                        {message.role === "user" ? <UserAvatar/> : <BotAvatar/>} 
                        <ReactMarkdown 
                            className="text-sm overflow-hidden leading-7"
                            components={{
                                pre: ({ node, ...props }) => (
                                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg border-blac-10">
                                       <pre {...props} />
                                    </div>
                                ),// This is code block which contains the code
                                code: ({node,...props}) => (
                                    <code className="bg-black/10 rounded-lg p-1" {...props} />
                                )// this is small code word in the explanation which will have bg-black/10
                            }}
                        >
                            {message.content || ""}
                        </ReactMarkdown>



                    </div>
                    ))}
          </div>
                </div>

            </div>
        </div>
     );
}
 
export default CodePage;
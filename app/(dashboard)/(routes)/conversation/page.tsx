"use client";
import {Heading} from "@/components/heading";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import { useState } from "react";

import { formSchema } from "./constant";
import { Form, FormField, FormItem, FormControl} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OpenAI from 'openai';




const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionCreateParams[]>([])

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
            
            const userMessage = {
                role: "user",
                content: values.prompt
              };


            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: newMessages
            });

            console.log("[RESPONSE]", response.data);
            setMessages((current) => [...current, userMessage, response.data]);

            console.log("[MESSAGES]", messages);

            form.reset();

        }catch(e: any){
            // TODO: Open Pro Modal
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
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div key={index}>
                                {message}
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
     );
}
 
export default ConversationPage;
"use client";
import {Heading} from "@/components/heading";
import * as z from "zod";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import { useState } from "react";

import { formSchema } from "./constant";
import { Form, FormField, FormItem, FormControl} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";
import {toast} from "react-hot-toast";

import { useProModal } from "@/hooks/use-pro-modal";


type Message = {
    role: "user" | "assistant";
    content: string;
  };


const MusicPage = () => {
    const proModal = useProModal();

    const router = useRouter();
    const [music, setMusic] = useState<string>();
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
            setMusic(undefined);
            
           

            const response = await axios.post("/api/music", values);
            setMusic(response.data.audio);
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
             title="Music"
             description="AI can sing for you."
             icon={Music}
             iconColor="text-emerald-500"
             bgColor="bg-emerald-500/10"
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
                                       placeholder="Beat of a drum..."
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
                    {!music && !isLoading && (
                        <Empty label="Music not found yet..."/>
                        )}
                        {music && (
                            <audio controls className="w-full mt-8">
                                <source src={music}/>
                            </audio>
                        )}
                </div>

            </div>
        </div>
     );
}
 
export default MusicPage;
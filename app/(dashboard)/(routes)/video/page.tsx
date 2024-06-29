"use client";
import {Heading} from "@/components/heading";
import * as z from "zod";
import { VideoIcon } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";





const VideoPage = () => {
    const proModal = useProModal();

    const router = useRouter();
    const [video, setVideo] = useState<string>();
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
            setVideo(undefined);
            
           

            const response = await axios.post("/api/video", values);
            setVideo(response.data[0]);
            form.reset();

        }catch(e: any){
            if(e?.response?.status === 403){
                proModal.onOpen();
            }
            console.log("[onSubmit]",e);
        }finally{
            router.refresh();
        }
    }
    return ( 
        <div>
            <Heading 
             title="Video"
             description="AI can make a movie now..."
             icon={VideoIcon}
             iconColor="text-green-500"
             bgColor="bg-green-500/10"
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
                                       placeholder="A dog playing with a ball..."
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
                    {!video && !isLoading && (
                        <Empty label="Video not found yet..."/>
                        )}
                        {video && (
                            <video className="w-full rounded-lg aspect-video mt-8 border bg-black" controls>
                                <source src={video} type="video/mp4"/>
                            </video>
                        )}
                </div>

            </div>
        </div>
     );
}
 
export default VideoPage;
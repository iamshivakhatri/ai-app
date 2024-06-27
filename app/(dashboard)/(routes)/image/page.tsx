"use client";
import {Heading} from "@/components/heading";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import { useState } from "react";
import {Download, ImageIcon} from "lucide-react";

import { amountOptions, formSchema, resolutionOptions } from "./constant";
import { Form, FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";

import {cn} from "@/lib/utils";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

type Message = {
    role: "user" | "assistant";
    content: string;
  };


const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "256x256"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log("I am printingvalues", values);

        try{
            setImages([]);
            const response = await axios.post("/api/image", values);
            const urls = response.data.map((image: {url: string}) => image.url);
            setImages(urls);
            console.log("This is the values", values);

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
             title="Image Generation"
             description="Generate beautiful images."
             icon={ImageIcon}
             iconColor="text-pink-500"
             bgColor="bg-pink-500/10"
            /> 
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form} >
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >

                            <FormField control={form.control} name="prompt" render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-6 ">
                                    <FormControl className="m-0 p-0">
                                      <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                       disabled={isLoading}
                                       placeholder="Generate an image of a white horse."
                                       {...field}
                                      />
                                     </FormControl>
                                </FormItem>

                            )}
                            
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                            
                                        </Select>
                                    </FormItem>
                                )}
                            
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                    {images.length === 0 && !isLoading && (
                        <Empty label="No Images Generated"/>
                        )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((image, index) => (
                            <Card key={index} className="rounded-lg overflow-hidden ">
                                <div className="relative aspect-square">
                                    <Image src={image} layout="fill" objectFit="cover" alt="Generated Image"/>
                                </div>
                                <CardFooter>
                                    <Button className="w-full" variant="secondary" onClick={()=>window.open(image)}>
                                        <Download size={18} className="mr-2 h-4 w-4 "/>
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                
                </div>

            </div>
        </div>
     );
}
 
export default ImagePage;
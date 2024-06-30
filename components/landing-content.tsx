"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name: "Abhishek Yadav",
        role: "Software Engineer",
        content: "I have been using this product for a while now and I am really impressed with the quality of the product. It has helped me a lot in my day to day work."
    },
    {
        name: "Dharma Thakur",
        role: "Software Engineer",
        content: "I have been using this product for a while now and I am really impressed with the quality of the product. It has helped me a lot in my day to day work."
    },
    {
        name: "Selisha Thapa",
        role: "Software Engineer",
        content: "I have been using this product for a while now and I am really impressed with the quality of the product. It has helped me a lot in my day to day work."
    },{
        name: "Abhishek Yadav",
        role: "Software Engineer",
        content: "I have been using this product for a while now and I am really impressed with the quality of the product. It has helped me a lot in my day to day work."
    },
    {
        name: "Dharma Thakur",
        role: "Software Engineer",
        content: "I have been using this product for a while now and I am really impressed with the quality of the product. It has helped me a lot in my day to day work."
    },
    {
        name: "Selisha Thapa",
        role: "Software Engineer",
        content: "I have been using this product for a while now and I am really impressed with the quality of the product. It has helped me a lot in my day to day work."
    },
]

export const LandingContent = () => {
    return(
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-[#192339]  border-none text-white">
                        <CardHeader>
                            <CardTitle className="">
                                <div>
                                   <p className="text-lg">{testimonial.name}</p> 
                                   <p className="text-sm text-zinc-400">{testimonial.role}</p> 
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {testimonial.content}
                            </CardContent>
                        </CardHeader>
                    </Card>

                ))}

            </div>
        </div>

       
    )
}
// New
import OpenAI from 'openai';
import {NextResponse} from "next/server";
import { auth } from '@clerk/nextjs/server';
import Replicate from 'replicate';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(req:Request){
    try {
      // Get the user id from the clerk auth
      const {userId} = auth()
      const body = await req.json();
      const {prompt} = body;

      


      if(!userId){
        return new NextResponse("Unauthorized", {status: 401, statusText: "Unauthorized"})
      }

      if(!prompt){
        return new NextResponse("Prompt are required.", {status: 500, statusText: "Internal Server Error"})

      }

      const freeTrial = await checkApiLimit(req);
      const isPro = await checkSubscription();

      if(!freeTrial && !isPro){
        return new NextResponse("API Limit Reached", {status: 403, statusText: "Too Many Requests"})
      }

      const input = {
        fps: 24,
        width: 1024,
        height: 576,
        prompt: prompt,
        guidance_scale: 17.5,
        negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
    };
    
    const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });

    if (!isPro){
      await increaseApiLimit(req);
    }
    

      return new NextResponse(JSON.stringify(response), {status: 200, statusText: "OK"})
        
    } catch (error) {
      console.log("[VIDEO_ERROR]", error); 
      return new NextResponse("Internal Server Error", {status: 500, statusText: "Internal Server Error"})
    }
}
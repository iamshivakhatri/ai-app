// New
import OpenAI from 'openai';
import {NextResponse} from "next/server";
import { auth } from '@clerk/nextjs/server';
import { json } from 'stream/consumers';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function POST(req:Request){
    try {
      // Get the user id from the clerk auth

      
      const {userId} = auth()
      const body = await req.json();
      console.log("This is the body", body);
      const {prompt, amount=1, resolution="256x256" } = body;



      if(!userId){
        return new NextResponse("Unauthorized", {status: 401, statusText: "Unauthorized"})
      }

      if(!openai){
        return new NextResponse("OpenAI API key not configured.", {status: 500, statusText: "Internal Server Error"})
      }

      if(!prompt){
        return new NextResponse("Prompt are required", {status: 400, statusText: "Bad Request"})
      }
      if(!amount){
        return new NextResponse("Amount is required", {status: 400, statusText: "Bad Request"})
      }
      if(!resolution){
        return new NextResponse("Resolution is required", {status: 400, statusText: "Bad Request"})
      }


      // const response = await openai.chat.completions.create({
      //   model: "gpt-3.5-turbo",
      //   messages: messages,
      // });

      const freeTrial = await checkApiLimit(req);
      const isPro = await checkSubscription();

      if(!freeTrial && !isPro){
        return new NextResponse("API Limit Reached", {status: 403, statusText: "Too Many Requests"})
      }

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: parseInt(amount, 10),
        size: resolution,
      });
      
      if (!isPro){
        await increaseApiLimit(req);
      }

      return new NextResponse(JSON.stringify(response.data), {status: 200, statusText: "OK"})
        
    } catch (error) {
      console.log("[IMAGE_ERROR]", error); 
      return new NextResponse("Internal Server Error", {status: 500, statusText: "Internal Server Error"})
    }
}
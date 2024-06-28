// New
import OpenAI from 'openai';
import {NextResponse} from "next/server";
import { auth } from '@clerk/nextjs/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(req:Request){
    try {
      // Get the user id from the clerk auth
      const {userId} = auth()
      const body = await req.json();
      const {prompt} = body;

      const input = {
        prompt_b: prompt,
    };

      const response = await replicate.run(
        "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
         { input}
        );
      console.log(response);



      if(!userId){
        return new NextResponse("Unauthorized", {status: 401, statusText: "Unauthorized"})
      }

      if(!prompt){
        return new NextResponse("Prompt are required.", {status: 500, statusText: "Internal Server Error"})
      }


      return new NextResponse(JSON.stringify(response), {status: 200, statusText: "OK"})
        
    } catch (error) {
      console.log("[MUSIC_ERROR]", error); 
      return new NextResponse("Internal Server Error", {status: 500, statusText: "Internal Server Error"})
    }
}
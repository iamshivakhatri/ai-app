// New
import OpenAI from 'openai';
import {NextResponse} from "next/server";
import { auth } from '@clerk/nextjs/server';
import { json } from 'stream/consumers';

type Message = {
  role: "system" | "user",
  content: string
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const instructionMessage:Message = {
  role: "system",
  content: "You are a code generator. You must only answer only in markdown code snippets. Use code comments for explanations. You can provide little explanation after the code." 
  
  
}

export async function POST(req:Request){
    try {
      // Get the user id from the clerk auth
      const {userId} = auth()
      const body = await req.json();
      const {messages} = body;



      if(!userId){
        return new NextResponse("Unauthorized", {status: 401, statusText: "Unauthorized"})
      }

      if(!openai){
        return new NextResponse("OpenAI API key not configured.", {status: 500, statusText: "Internal Server Error"})
      }

      if(!messages){
        return new NextResponse("Messages are request", {status: 400, statusText: "Bad Request"})
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [instructionMessage, ...messages],
      });

      return new NextResponse(JSON.stringify(response.choices[0].message), {status: 200, statusText: "OK"})
        
    } catch (error) {
      console.log("[CODE_ERROR]", error); 
      return new NextResponse("Internal Server Error", {status: 500, statusText: "Internal Server Error"})
    }
}
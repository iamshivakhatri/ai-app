// New
import OpenAI from 'openai';
import {NextResponse} from "next/server";
import { auth } from '@clerk/nextjs/server';
import { json } from 'stream/consumers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

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
        messages: messages,
      });

      return new NextResponse(JSON.stringify(response.choices[0].message), {status: 200, statusText: "OK"})
        
    } catch (error) {
      console.log("[CONVERSATION_ERROR]", error); 
      return new NextResponse("Internal Server Error", {status: 500, statusText: "Internal Server Error"})
    }
}
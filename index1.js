import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync"
import dotenv from 'dotenv'
dotenv.config()
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: []
});

async function main() {
    let userPrompt = readlineSync.question("Ask me anything: ")
    const response = await chat.sendMessage({
        message : userPrompt
    })
    console.log(response.text)
    main()
}

main()

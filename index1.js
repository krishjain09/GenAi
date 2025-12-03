import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync"
const ai = new GoogleGenAI({ apiKey: "AIzaSyAo60fd7QpCFDV2HlAree7BeQ4v9ixbO8c" });

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

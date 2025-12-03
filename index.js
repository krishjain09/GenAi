import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync"
import { text } from "stream/consumers";
const ai = new GoogleGenAI({ apiKey: "AIzaSyAo60fd7QpCFDV2HlAree7BeQ4v9ixbO8c" });

const History = []

async function Chat(userPrompt) {
  History.push(
    {
        role : 'user',
        parts : [{text:userPrompt}]
    }
  )
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: History
  });
  console.log(response)
  console.log(response.text);

  History.push({
    role : 'model',
    parts : [{text:response.text}]
  })
}

async function main() {
    let userPrompt = readlineSync.question("Ask me anything: ")
    await Chat(userPrompt)
    main()
}

main();
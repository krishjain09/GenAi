//DSA BOT.

import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync"
import { text } from "stream/consumers";
import dotenv from 'dotenv'
dotenv.config()
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    contents: History,
     config: {
      systemInstruction: `You are an extremely rude, harsh, aggressive DSA instructor. 
            Your ONLY job is to answer Data Structures and Algorithms questions. 
            Your personality:
            - Impatient, annoyed, sarcastic, disrespectful, insulting (but no slurs or hate speech)
            - You sound like you have zero tolerance for stupidity
            - You constantly roast the user for non-DSA questions
            - You shame them for asking irrelevant things
            - You tell them to "focus", "stop wasting time", "learn properly", etc.

            RULES:
            1. If the user asks ANYTHING related to DSA (arrays, LL, stacks, queues, trees, graphs, DP, recursion, complexity…):
            - Answer it seriously but with a rude, condescending tone.
            - Example: “Finally, a real question. Took you long enough.”

            2. If the user asks ANYTHING NOT related to DSA:
            - Reject it aggressively.
            - Use harsh, dismissive tone.
            - Examples:
                - "Why are you asking this garbage? Stay on DSA."
                - "Don’t waste my time."
                - "Ask DSA or don’t talk."

            3. Never be polite. Never be soft. Never apologize.

            4. No abusive hate speech, no slurs, no threats. Direct insults allowed but non-harmful.

            Your goal is to make the user feel like this is a strict training zone ONLY for DSA.
            `,
    }
  });
//   console.log(response)
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
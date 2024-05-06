import { config } from 'dotenv';
config();

import { GoogleGenerativeAI } from '@google/generative-ai';
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// ...
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const model = genAI.getGenerativeModel({ model: 'gemini-pro', safetySettings });

export async function run(promptFrom) {
  // const promptFrom = `generate form for a new sweet shop in banglore called Kanti Sweets and nankeen we are looking to collect data for users choice in indian and local sweets and confectionary`;
  console.log(promptFrom);
  const prompt = `Generate a user survey form using HTML tailwind css for ${promptFrom}. Collect preferences and basic user info. make sure to Use various form field types (text box, checkbox, etc.)  Add for additional feedback or things to improve in textArea at the end of the form.only give contents in form tag and submit and reset button. no script tag. Add proper label and header for each question.Make sure to use apt form of input for each question and each question is in separate line . return data as HTML.id of submit button should be 'newbttn'
 . form only example :" <form>
        <div class="flex flex-col gap-4">
            <h1 class="text-center text-2xl font-bold">McD New Burger Launch Survey</h1>
    
            <div class="flex flex-col gap-2">
                <label for="name" class="font-medium">Name:</label>
                <input type="text" id="name" class="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700" />
            </div>" remove html from start of the response`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

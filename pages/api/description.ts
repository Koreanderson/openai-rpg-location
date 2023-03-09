import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { CreateCompletionRequestPrompt, CreateCompletionResponse } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const initialPromptString = "Write a two paragraph description of a location set in a fantasy world.";

// TODO: Pull arguments into a typed object and move to a util

function generateTownDescriptionPrompt(
  name: string,
  size: string,
  inhabitants: string,
  focalPoints: string,
  issues: string,
  trade: string
): CreateCompletionRequestPrompt {
  return `
    ${initialPromptString}
    Name: ${name}
    Size: ${size}
    Inhabitants: ${inhabitants}
    Focal Points: ${focalPoints}
    Issues: ${issues}
    Trade: ${trade}
    Description:
  `
}

type ResponseData = {
  description: string | undefined
}

async function fetchCompletionFromPrompt(prompt: CreateCompletionRequestPrompt): Promise<ResponseData> {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.8,
      max_tokens: 256,
    });
    const description: string | undefined = response.data.choices[0].text
    
    return ({ 
      "description": description 
    })
  } catch (e:any) {
    throw new Error(`Error: ${e.message}`);
  }

}

const prompt: CreateCompletionRequestPrompt = generateTownDescriptionPrompt("Fangorn", "City", "Elves, Goblins", "Central Clock", "Political Strife", "Machinery");



// Pull into a util
function getOpenAICompletion() {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await fetchCompletionFromPrompt(prompt))
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { CreateCompletionRequestPrompt } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const initialPromptString = "Write a two paragraph description of a location set in a fantasy world.";
// TODO: Pull arguments into a typed object and move to a util
function generateTownDescriptionPrompt(name: string, size: string, inhabitants: string, focalPoints: string, issues: string, trade: string): CreateCompletionRequestPrompt {
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

const prompt: CreateCompletionRequestPrompt = generateTownDescriptionPrompt("Fangorn", "City", "Elves, Goblins", "Central Clock", "Political Strife", "Machinery");
let completion: String | undefined;

openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.8,
  max_tokens: 256,
})
  .then((res) => {
    completion = res.data.choices[0].text
  });

console.log(completion)

type Data = {
  description: string
}

type ReqBody = {

}

// Pull into a util
function getOpenAICompletion() {

}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ description: 'John Doe' })
}

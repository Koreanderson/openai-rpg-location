import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import { Configuration, OpenAIApi } from 'openai';
import { CreateCompletionRequestPrompt, CreateCompletionResponse } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const initialPromptString = "Write a two paragraph description of a location set in a fantasy world.";

// TODO: Pull arguments into a typed object and move to a util

type GenerateDescriptionPayload = {
  name: string,
  size: string,
  inhabitants: string,
  focalPoints: string,
  trade: string,
  conflict: string,
}

type ResponseData = {
  description: string | undefined
}

function generateTownDescriptionPrompt(config: GenerateDescriptionPayload | NextApiRequestQuery): CreateCompletionRequestPrompt {
  return `
    ${initialPromptString}
    Name: ${config.name}
    Size: ${config.size}
    Inhabitants: ${config.inhabitants}
    Focal Points: ${config.focalPoints}
    Conflict: ${config.conflict}
    Trade: ${config.trade}
    Description:
  `
}

function fetchCompletionFromPrompt(prompt: CreateCompletionRequestPrompt): Promise<ResponseData> {
  return openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.8,
    max_tokens: 256,
  }).then((res) => {
    const description: string | undefined = res.data.choices[0].text
    return ({
      description
    })
  }).catch((e) =>{
    throw new Error("Error: " + e);
  })
}

function buildResponse(query: NextApiRequestQuery) {
  const config: NextApiRequestQuery = query
  const prompt: CreateCompletionRequestPrompt = generateTownDescriptionPrompt(config);
  return fetchCompletionFromPrompt(prompt)
    .then((completion) => {
      return completion;
    })
    .catch((e) => {
      throw new Error("Error: " + e);
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await buildResponse(req.query);
  res.status(200).json(response);
}

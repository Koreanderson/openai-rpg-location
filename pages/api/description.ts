import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { Configuration, OpenAIApi } from "openai";
import { GenerateDescriptionPayload, GenerateDescriptionResponse } from "@/common/types";
import {
  CreateCompletionRequestPrompt,
  CreateCompletionResponse,
} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function generateTownDescriptionPrompt(
  config: GenerateDescriptionPayload | NextApiRequestQuery
): CreateCompletionRequestPrompt {
  const guildPromptString: string = config.enableGuilds
    ? "- Guilds (Name, Type)"
    : "";
  const keyLocationPromptString: string = config.enableKeyLocations
    ? "- Key Locations"
    : "";
  const populationSizeString: string = config.enablePopulationSize
    ? "- Population Size"
    : "";
  const dietiesPrompt: string = config.enableDieties
    ? "- Worshiped Dieties"
    : "";
  const factionsPrompt: string = config.enableFactions
    ? "- Political Factions (Leaders, Views)"
    : "";

  const optionalValues: Array<string> = [
    guildPromptString,
    keyLocationPromptString,
    populationSizeString,
    dietiesPrompt,
    factionsPrompt,
  ];
  const moreDetailsPrompt: string = optionalValues.some((el) => el.length)
    ? "The description should include the following:"
    : "";

  return `
    Write a detailed and historic description of a location set in a fantasy world. The prompt should be a max of 6 paragraphs and based on the following criteria:

    Name: ${config.name}
    Size: ${config.size}
    Inhabitants: ${config.inhabitants}
    Focal Points: ${config.focalPoints}
    Conflict: ${config.conflict}
    Trade: ${config.trade}

    ${moreDetailsPrompt}

    ${guildPromptString}
    ${keyLocationPromptString}
    ${populationSizeString}
    ${dietiesPrompt}
    ${factionsPrompt}

    Description:
  `;
}

function fetchCompletionFromPrompt(
  prompt: CreateCompletionRequestPrompt
): Promise<GenerateDescriptionResponse> {
  return openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
      max_tokens: 500,
    })
    .then((res) => {
      const description: string | any = res.data.choices[0].text;
      return {
        description,
      };
    })
    .catch((e) => {
      throw new Error("Error: " + e);
    });
}

function buildResponse(query: NextApiRequestQuery) {
  const config: NextApiRequestQuery = query;
  const prompt: CreateCompletionRequestPrompt =
    generateTownDescriptionPrompt(config);
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

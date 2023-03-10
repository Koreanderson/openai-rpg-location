interface GenerateDescriptionPayload {
  name: string;
  size: string;
  inhabitants: string;
  focalPoints: string;
  trade: string;
  conflict: string;
  enableGuilds: boolean;
  enableKeyLocations: boolean;
  enablePopulationSize: boolean;
  enableDieties: boolean;
  enableFactions: boolean;
}
interface GenerateDescriptionResponse {
  description: string | any;
}


export { GenerateDescriptionPayload, GenerateDescriptionResponse }


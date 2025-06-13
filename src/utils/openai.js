import OpenAI from "openai";
import {OPENAI_KEY} from "./constants";

// initialize & authorization of the openai
export const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

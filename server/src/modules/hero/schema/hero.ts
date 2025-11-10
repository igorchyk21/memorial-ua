import { HERO_STAT } from "@global/types";
import z from "zod";
 

// Zod-схема
export const zHeroShortSchema = z.object({
  ID: z.number(),
  fName: z.string(),
  lName: z.string(),
  mName: z.string(),
  birth: z.number(),
  death: z.number(),
  photo: z.string().optional(),
  mobilization: z.number(),
  armyName: z.string().nullable(),
  region: z.string().optional(),
  callSign: z.string().optional(),
  url: z.string(),
  status: z.enum(HERO_STAT),
  candleExpiries: z.number().optional(),
  slides: z.array(z.string()).optional(),
  about: z.string().nullable().optional(),
  publicPhone: z.string().nullable().optional(),
});
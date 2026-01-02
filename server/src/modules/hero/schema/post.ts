import { HERO_POST_STAT } from "@global/types";
import { z } from "zod";

export const zHeroPostSchema = z.object({
  ID: z.number(),
  heroId: z.number(),
  userId: z.number(),
  dt: z.number(),
  body: z.string(),
  userName: z.string().optional(),
  author: z.string().nullable().optional(),
  userPicture: z.string().optional(),
  status: z.nativeEnum(HERO_POST_STAT),
});


export const zHeroCandleSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  days: z.number(),
  price: z.number(),
  comment: z.string(),
}).strip();
 
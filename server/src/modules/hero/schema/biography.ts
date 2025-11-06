import { z } from "zod";

export const zHeroBiographyItemSchema = z.object({
  ID: z.number(),
  heroId: z.number(),
  dt: z.number(),
  title: z.string().min(3),
  body: z.string().nullable().optional(),
});



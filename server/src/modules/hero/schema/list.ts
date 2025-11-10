import { z } from "zod";
 
export const zHeroListRequestParamsSchema = z.object({
    search: z.string().nullable().optional(),

    page: z.
        preprocess((val) => {
            if (typeof val === "string" && val.trim() !== "") {
                const num = Number(val);
                return isNaN(num) ? val : num;
            }
            return val;
        }, z.number().int().positive().optional()),

    onPage: z.
        preprocess((val) => {
            if (typeof val === "string" && val.trim() !== "") {
                const num = Number(val);
                return isNaN(num) ? val : num;
            }
            return val;
        }, z.number().int().positive().optional()),

    status: z
    .string()
    .transform((val) => {
        if (!val.trim()) return []; // якщо порожній рядок
        return val
        .split(",")
        .map((num) => Number(num.trim()))
        .filter((n) => !isNaN(n)); // відсікаємо некоректні значення
    })
    .optional(),

    onlyCandle: z.preprocess((val) => {
        if (typeof val === "string") {
            const lowered = val.toLowerCase();
            if (["true", "1"].includes(lowered)) return true;
            if (["false", "0"].includes(lowered)) return false;
        }
        return val;
    }, z.boolean().optional()),

    sort: z.enum([
        "name",
        "nameDesc",
        "birth",
        "birthDesc",
        "death",
        "deathDesc",
        ""
    ]).optional(),

    region: z.string().optional()

}).strip();

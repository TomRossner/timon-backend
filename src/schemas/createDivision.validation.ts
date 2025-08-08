import { z } from "zod";
import { NAME_REGEXP } from "../lib/regexp";

export const createDivisionSchema = z.object({
    body: z.object({
        division: z.string().regex(NAME_REGEXP),
    }),
});

export type CreateDivisionInput = z.infer<typeof createDivisionSchema>['body'];
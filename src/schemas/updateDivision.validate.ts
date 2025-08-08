import { z } from "zod";
import { NAME_REGEXP } from "../lib/regexp";

export const updateDivisionSchema = z.object({
    body: z.object({
        name: z.string().regex(NAME_REGEXP),
    }),
});

export type UpdateDivisionInput = z.infer<typeof updateDivisionSchema>['body'];
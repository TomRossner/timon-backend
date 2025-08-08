import { z } from "zod";
import { NAME_REGEXP } from "../lib/regexp";
import { allDivisions } from "../lib/divisions";

const divisions = [...allDivisions as readonly string[]] as [string, ...string[]];

export const createTeamSchema = z.object({
    body: z.object({
        teamName: z
            .string()
            .regex(NAME_REGEXP),
        manager: z.string(), // ObjectId reference
        coaches: z.array(z.string()), // Array of ObjectId references
        roster: z.array(z.string()),  // Array of ObjectId references
        logo: z.string().optional(),
        division: z.enum(divisions, { message: `Invalid division. Valid divisions are ${allDivisions.join(", ")}.` }),
        address: z.object({
            city: z.string(),
            fieldAddress: z.string(),
            fieldName: z.string().optional(),
            location: z.object({
                lat: z.number(),
                long: z.number(),
            }),
        }),
    }),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>['body'];
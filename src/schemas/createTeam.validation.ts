import { z } from "zod";
import { NAME_REGEXP } from "../lib/regexp";
import fs from "fs";
import path from "path";

const pathToDivisionsJson = path.resolve(path.join(__dirname, "..", "database", "divisions.json"));

const divisionsData = fs.readFileSync(pathToDivisionsJson, 'utf8');
const divisions = JSON.parse(divisionsData);

export const createTeamSchema = z.object({
    body: z.object({
        teamName: z
            .string()
            .regex(NAME_REGEXP),
        manager: z.string(), // ObjectId reference
        coaches: z.array(z.string()), // Array of ObjectId references
        roster: z.array(z.string()),  // Array of ObjectId references
        logo: z.string().optional(),
        division: z.enum(divisions, { message: `Invalid division. Valid divisions are ${divisions.join(", ")}.` }),
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
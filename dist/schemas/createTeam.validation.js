"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeamSchema = void 0;
const zod_1 = require("zod");
const regexp_1 = require("../lib/regexp");
exports.createTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        teamName: zod_1.z
            .string()
            .regex(regexp_1.NAME_REGEXP),
        manager: zod_1.z.string(), // ObjectId reference
        coaches: zod_1.z.array(zod_1.z.string()), // Array of ObjectId references
        roster: zod_1.z.array(zod_1.z.string()), // Array of ObjectId references
        logo: zod_1.z.string().optional(),
        address: zod_1.z.object({
            city: zod_1.z.string(),
            fieldAddress: zod_1.z.string(),
            fieldName: zod_1.z.string().optional(),
            location: zod_1.z.object({
                lat: zod_1.z.number(),
                long: zod_1.z.number(),
            }),
        }),
    }),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayerSchema = void 0;
const zod_1 = require("zod");
exports.createPlayerSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string(), // ObjectId reference
        team: zod_1.z.string(), // ObjectId reference
        jerseyNumber: zod_1.z.number(),
        isCaptain: zod_1.z.boolean().optional(),
        role: zod_1.z.enum(["handler", "cutter", "hybrid"]).optional(),
        injured: zod_1.z.boolean().optional(),
    }),
});

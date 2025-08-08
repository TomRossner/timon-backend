"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeamSchema = void 0;
const zod_1 = require("zod");
const regexp_1 = require("../lib/regexp");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pathToDivisionsJson = path_1.default.resolve(path_1.default.join(__dirname, "..", "database", "divisions.json"));
const divisionsData = fs_1.default.readFileSync(pathToDivisionsJson, 'utf8');
const divisions = JSON.parse(divisionsData);
exports.createTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        teamName: zod_1.z
            .string()
            .regex(regexp_1.NAME_REGEXP),
        manager: zod_1.z.string(), // ObjectId reference
        coaches: zod_1.z.array(zod_1.z.string()), // Array of ObjectId references
        roster: zod_1.z.array(zod_1.z.string()), // Array of ObjectId references
        logo: zod_1.z.string().optional(),
        division: zod_1.z.enum(divisions, { message: `Invalid division. Valid divisions are ${divisions.join(", ")}.` }),
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

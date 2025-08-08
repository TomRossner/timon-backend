"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDivisionSchema = void 0;
const zod_1 = require("zod");
const regexp_1 = require("../lib/regexp");
exports.createDivisionSchema = zod_1.z.object({
    body: zod_1.z.object({
        division: zod_1.z.string().regex(regexp_1.NAME_REGEXP),
    }),
});

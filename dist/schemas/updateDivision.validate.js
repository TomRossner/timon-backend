"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDivisionSchema = void 0;
const zod_1 = require("zod");
const regexp_1 = require("../lib/regexp");
exports.updateDivisionSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().regex(regexp_1.NAME_REGEXP),
    }),
});

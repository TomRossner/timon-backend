"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const httpStatusCodes_1 = __importDefault(require("../lib/httpStatusCodes"));
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse({
        body: req.body,
    });
    if (!result.success) {
        res
            .status(httpStatusCodes_1.default.BAD_REQUEST)
            .json({
            message: result.error.message,
        });
        return;
    }
    next();
};
exports.validate = validate;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = void 0;
const HTTP_STATUS_CODES_1 = __importDefault(require("../lib/HTTP_STATUS_CODES"));
const errorMessages_1 = require("../lib/errorMessages");
const validateCredentials = (schema) => (req, res, next) => {
    const result = schema.safeParse({
        body: req.body,
    });
    if (!result.success) {
        res
            .status(HTTP_STATUS_CODES_1.default.BAD_REQUEST)
            .json({
            message: errorMessages_1.ERROR_MESSAGES.INVALID_CREDENTIALS
        });
        return;
    }
    next();
};
exports.validateCredentials = validateCredentials;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const HTTP_STATUS_CODES_1 = __importDefault(require("../lib/HTTP_STATUS_CODES"));
const errorMessages_1 = require("../lib/errorMessages");
const validateUser = (schema) => (req, res, next) => {
    const result = schema.safeParse({
        body: req.body,
    });
    if (!result.success) {
        res
            .status(HTTP_STATUS_CODES_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: errorMessages_1.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
        return;
    }
    next();
};
exports.validateUser = validateUser;

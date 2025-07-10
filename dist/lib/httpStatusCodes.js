"use strict";
// HTTP status codes
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP_STATUS_CODES = {
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    SUCCESS: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONTENT_TOO_LARGE: 413,
    TOO_MANY_REQUESTS: 429,
};
exports.default = HTTP_STATUS_CODES;

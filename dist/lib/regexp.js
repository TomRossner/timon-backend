"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERNAME_REGEXP = exports.NAME_REGEXP = exports.PASSWORD_REGEXP = exports.EMAIL_REGEXP = void 0;
exports.EMAIL_REGEXP = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
exports.PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
exports.NAME_REGEXP = /([a-zA-Z]{2,32}-*)+/;
exports.USERNAME_REGEXP = /^(?=.*[\p{L}\d])[\p{L}\d_]{3,32}$/u;

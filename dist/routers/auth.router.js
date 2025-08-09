"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authCredentials_validation_1 = require("../schemas/authCredentials.validation");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, validate_middleware_1.validate)(authCredentials_validation_1.authCredentialsSchema), auth_controller_1.userLoginHandler);
exports.default = authRouter;

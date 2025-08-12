"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authCredentials_validation_1 = require("../schemas/authCredentials.validation");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const passport_1 = __importDefault(require("passport"));
require("../auth/google.provider");
const constants_1 = require("../lib/constants");
const jwt_1 = require("../lib/jwt");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, validate_middleware_1.validate)(authCredentials_validation_1.authCredentialsSchema), auth_controller_1.userLoginHandler);
authRouter.get('/login/google', passport_1.default.authenticate('google'));
authRouter.get('/google/callback', passport_1.default.authenticate('google', { session: false, failureRedirect: `${constants_1.CLIENT_URL}/signin` }), (req, res) => {
    const token = (0, jwt_1.generateToken)(req.user); // generate JWT
    res.redirect(`${constants_1.CLIENT_URL}?token=${token}`);
});
exports.default = authRouter;

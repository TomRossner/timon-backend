"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const pathToEnv = path_1.default.resolve(__dirname, "..", ".env.local");
(0, dotenv_1.config)({ path: pathToEnv });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const httpStatusCodes_1 = __importDefault(require("./lib/httpStatusCodes"));
const users_router_1 = __importDefault(require("./routers/users.router"));
const database_1 = require("./database/database");
const teams_router_1 = __importDefault(require("./routers/teams.router"));
const players_router_1 = __importDefault(require("./routers/players.router"));
const divisions_router_1 = __importDefault(require("./routers/divisions.router"));
const events_router_1 = __importDefault(require("./routers/events.router"));
const PORT = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
const notFoundHandler = (req, res) => {
    res.status(httpStatusCodes_1.default.NOT_FOUND).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
    });
};
app.use('/api/users', users_router_1.default);
app.use('/api/teams', teams_router_1.default);
app.use('/api/players', players_router_1.default);
app.use('/api/divisions', divisions_router_1.default);
app.use('/api/events', events_router_1.default);
app.use(notFoundHandler);
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDb)(process.env.DB_URI, () => console.log('Connected to database'));
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (error) {
        console.error(error);
    }
});
init();

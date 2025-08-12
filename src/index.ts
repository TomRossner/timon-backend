import { config } from "dotenv";
import path from "path";

const pathToEnv = path.resolve(__dirname, "..", ".env.local");

config({ path: pathToEnv });

import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import HTTP_STATUS from "./lib/httpStatusCodes";
import usersRouter from "./routers/users.router";
import { connectDb } from "./database/database";
import teamsRouter from "./routers/teams.router";
import playersRouter from "./routers/players.router";
import divisionsRouter from "./routers/divisions.router";
import eventsRouter from "./routers/events.router";
import authRouter from "./routers/auth.router";
import passport from "passport";
import { CLIENT_URL } from "./lib/constants";

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());

const notFoundHandler = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
    });
}

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/players', playersRouter);
app.use('/api/divisions', divisionsRouter);
app.use('/api/events', eventsRouter);

app.use(notFoundHandler);

const init = async () => {
    try {
        await connectDb(process.env.DB_URI as string, () => console.log('Connected to database'));
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error(error);
    }
}

init();
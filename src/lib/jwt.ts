import { config } from "dotenv";
config();

import jwt from "jsonwebtoken";
import { FullUser } from "../types/user";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const generateToken = (data: FullUser) => {
    return jwt.sign(data, JWT_SECRET);
}
import fs from "fs";
import path from "path";

export const DEFAULT_DIVISIONS = [
    "pro",
    "amateur",
    "women",
    "youth"
] as const;

export enum Divisions {
    PRO = "pro",
    AMATEUR = "amateur",
    WOMEN = "women",
    YOUTH = "youth",
}

export type Division = "pro" | "amateur" | "women" | "youth";

export type DivisionData = {
    name: Division;
}

const pathToDivisionsJson = path.resolve(path.join(__dirname, "..", "database", "divisions.json"));

const divisionsData = fs.readFileSync(pathToDivisionsJson, 'utf8');
export const allDivisions: Division[] = JSON.parse(divisionsData);
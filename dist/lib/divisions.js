"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allDivisions = exports.Divisions = exports.DEFAULT_DIVISIONS = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.DEFAULT_DIVISIONS = [
    "pro",
    "amateur",
    "women",
    "youth"
];
var Divisions;
(function (Divisions) {
    Divisions["PRO"] = "pro";
    Divisions["AMATEUR"] = "amateur";
    Divisions["WOMEN"] = "women";
    Divisions["YOUTH"] = "youth";
})(Divisions || (exports.Divisions = Divisions = {}));
const pathToDivisionsJson = path_1.default.resolve(path_1.default.join(__dirname, "..", "database", "divisions.json"));
const divisionsData = fs_1.default.readFileSync(pathToDivisionsJson, 'utf8');
exports.allDivisions = JSON.parse(divisionsData);

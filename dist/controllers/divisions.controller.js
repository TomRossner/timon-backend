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
exports.deleteDivisionHandler = exports.updateDivisionHandler = exports.createDivisionHandler = exports.getDivisionHandler = void 0;
const divisions_service_1 = require("../services/divisions.service");
const httpStatusCodes_1 = __importDefault(require("../lib/httpStatusCodes"));
const arrayToObject_1 = require("../lib/arrayToObject");
const divisions_1 = require("../lib/divisions");
const getDivisionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        if (!name) {
            // Return all divisions
            let divisions = yield (0, divisions_service_1.findDivision)({});
            if (!divisions.length) {
                const createDefaultDivisions = () => Promise.all(divisions_1.allDivisions.map((name) => __awaiter(void 0, void 0, void 0, function* () {
                    const divisionData = { name };
                    return yield (0, divisions_service_1.createNewDivision)(divisionData);
                })));
                const defaultDivisions = yield createDefaultDivisions();
                if (!defaultDivisions.length) {
                    throw new Error(`An error occurred while creating default divisions.`);
                }
                divisions = yield (0, divisions_service_1.findDivision)({});
            }
            res
                .status(httpStatusCodes_1.default.SUCCESS)
                .json((0, arrayToObject_1.arrayToObject)(divisions, division => division.name));
            return;
        }
        const division = yield (0, divisions_service_1.findDivision)({ name });
        if (!division.length) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Division ${name} not found.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json((0, arrayToObject_1.arrayToObject)(division, division => division.name));
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed finding division(s).`,
        });
    }
});
exports.getDivisionHandler = getDivisionHandler;
const createDivisionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { division } = req.body;
        const exists = yield (0, divisions_service_1.findDivision)({ name: division });
        if (exists) {
            res
                .status(httpStatusCodes_1.default.BAD_REQUEST)
                .json({
                message: `Division ${division} already exists.`,
            });
            return;
        }
        const newDivision = yield (0, divisions_service_1.createNewDivision)(division);
        if (!newDivision) {
            throw new Error(`Failed creating division ${division}.`);
        }
        res
            .status(httpStatusCodes_1.default.CREATED)
            .json({
            message: `Division ${division} created successfully.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed creating division ${req.body.division}.`,
        });
    }
});
exports.createDivisionHandler = createDivisionHandler;
const updateDivisionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const exists = yield (0, divisions_service_1.findDivision)({ name });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Division ${name} not found.`,
            });
            return;
        }
        const updated = yield (0, divisions_service_1.updateDivision)({ name }, req.body);
        if (!updated) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed updating division ${name}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `Division ${updated.name} updated successfully.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed updating division ${req.body.name}.`,
        });
    }
});
exports.updateDivisionHandler = updateDivisionHandler;
const deleteDivisionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const exists = yield (0, divisions_service_1.findDivision)({ name });
        if (!exists) {
            res
                .status(httpStatusCodes_1.default.NOT_FOUND)
                .json({
                message: `Division ${name} not found.`,
            });
            return;
        }
        const deleted = yield (0, divisions_service_1.deleteDivision)(name);
        if (!deleted) {
            res
                .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
                .json({
                message: `Failed deleting division ${name}.`,
            });
            return;
        }
        res
            .status(httpStatusCodes_1.default.SUCCESS)
            .json({
            message: `Division ${name} deleted.`,
        });
    }
    catch (error) {
        res
            .status(httpStatusCodes_1.default.INTERNAL_SERVER_ERROR)
            .json({
            message: error instanceof Error
                ? error.message
                : `Failed deleting division ${req.params.name}.`,
        });
    }
});
exports.deleteDivisionHandler = deleteDivisionHandler;

import { FilterQuery, UpdateQuery } from "mongoose";
import DivisionModel, { DivisionDoc } from "../models/division.model";
import { DivisionData } from "../lib/divisions";

export const findDivision = async (query: FilterQuery<DivisionDoc>) => {
    const divisions = await DivisionModel.find(query).select({ __v: 0 });

    return divisions;
}

export const createNewDivision = async (divisionData: DivisionData) => {
    return (await DivisionModel.create(divisionData)).toObject();
}

export const updateDivision = async (query: FilterQuery<DivisionDoc>, update: UpdateQuery<DivisionDoc>) => {
    return await DivisionModel.findOneAndUpdate(query, update, { new: true }).lean();
}

export const deleteDivision = async (name: string) => {
    return await DivisionModel.findOneAndDelete({ name });
}
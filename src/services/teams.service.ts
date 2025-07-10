import { FilterQuery, UpdateQuery } from "mongoose";
import TeamModel, { TeamDoc } from "../models/team.model";
import { TeamData } from "../types/team";

// Needed for populations paths
import "../models/player.model";
import "../models/team.model";
import "../models/user.model";

const USER_SELECT_FIELDS = { __v: 0, password: 0 };

export const findTeam = async (query: FilterQuery<TeamDoc>) => {
    const teams = await TeamModel.find(query).select({ __v: 0 });

    if (!teams.length) return [];

    const populatedTeams = await Promise.all(
        teams.map(team =>
            TeamModel
                .findById(team._id)
                .select({ __v: 0 })
                .populate({
                    path: 'manager',
                    select: USER_SELECT_FIELDS
                })
                .populate({
                    path: 'coaches',
                    populate: { path: 'user', select: USER_SELECT_FIELDS },
                    select: { __v: 0 }
                })
                .populate({
                    path: 'roster',
                    populate: { path: 'user', select: USER_SELECT_FIELDS },
                    select: { __v: 0 }
                })
                .lean()
        )
    );

    return populatedTeams;
}

export const createNewTeam = async (teamData: TeamData) => {
    return (await TeamModel.create(teamData)).toObject();
}

export const updateTeam = async (query: FilterQuery<TeamDoc>, update: UpdateQuery<TeamDoc>) => {
    return await TeamModel.findOneAndUpdate(query, update, { new: true }).lean();
}

export const deleteTeam = async (teamId: string) => {
    return await TeamModel.findOneAndDelete({ teamId });
}
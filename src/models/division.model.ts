import mongoose, { InferSchemaType } from "mongoose";

const DivisionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
}, {
    collection: 'divisions',
    timestamps: false,
});

const DivisionModel = mongoose.model('Division', DivisionSchema);

export type DivisionDoc = InferSchemaType<typeof DivisionSchema>;

export default DivisionModel;
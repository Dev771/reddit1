import tagsSchema from "../models/tagsSchema.js";

export const getTags = async (req, res) => {
    try {
        const tags = await tagsSchema.find();

        res.status(201).json(tags);
    } catch (error) {
        console.log(error);
    }
}

export const createTag = async (req, res) => {
    const tagdata = req.body;

    const newTag = tagsSchema({...tagdata});
    try {
        await newTag.save();

        res.status(201).json(newTag);
    } catch (error) {
        console.log(error);
    }
}
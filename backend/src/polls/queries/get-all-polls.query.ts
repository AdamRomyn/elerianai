import Joi = require("joi");
import { Poll } from "../polls.model";
import { Request, Response } from "express";
import { pollsStore } from "../polls.store";

// Endpoint to create a poll
export const getAllPollQuery = async (req: Request, res: Response) => {
    try {
        res.send(pollsStore.polls);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Internal server error" });
    }

}
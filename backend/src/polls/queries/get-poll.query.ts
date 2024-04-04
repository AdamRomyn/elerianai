import Joi = require("joi");
import { Poll } from "../polls.model";
import { Request, Response } from "express";
import { pollsStore } from "../polls.store";

// Validation on endpoint
export const PollQueryValidator = Joi.object<Poll>().keys({
    id: Joi.number().required()
});

// Endpoint to create a poll
export const getPollQuery = async (req: Request, res: Response) => {
    try {
        console.log("request", req.params)
        // Validate the request body
        const { error } = PollQueryValidator.validate(req.params);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const poll = pollsStore.polls.find(poll => poll.id == req.params.id);
        
        res.send({ poll});
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Internal server error" });
    }

}
// add joi validation
import Joi = require("joi");
import { Poll } from "../polls.model";
import { pollsStore } from "../polls.store";
import { Request, Response } from "express";

export const createPollValidator = Joi.object<Poll>().keys({
    question: Joi.string().required(),
    answers: Joi.array().items(Joi.object().keys({
        value: Joi.string().required(),
        votes: Joi.number().required()
    }))
});

// Endpoint to create a poll
export const createPollCommand = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const { error } = createPollValidator.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const poll = req.body as Poll;
        poll.id = pollsStore.polls.length + 1;

        pollsStore.polls.push(poll);
        res.send({ id: poll.id });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Internal server error" });
    }

}
import Joi = require("joi")
import { pollsStore } from "../polls.store"
import { Request, Response } from "express"

export const submitPollVoteValidation = Joi.object().keys({
    answer: Joi.string().required()
})

export const submitPollVoteCommand = async (req: Request, res: Response) => {
    try {
        const { error } = submitPollVoteValidation.validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const poll = pollsStore.polls.find(poll => poll.id == req.params.id)
        if (!poll) {
            return res.status(404).send({ message: "Poll not found" })
        }
        const answer = poll.answers.find(answer => answer.value == req.body.answer)
        if (!answer) {
            return res.status(400).send({ message: "Answer not found" })
        }
        answer.votes++
        res.send({ message: "Vote submitted" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: "Internal server error" })
    }
}
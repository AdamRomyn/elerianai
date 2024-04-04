import { Router } from 'express';
import { createPollCommand } from './commands/create-poll.command';
import { submitPollVoteCommand } from './commands/submit-poll-vote.command';
import { getPollQuery } from './queries/get-poll.query';
import { getAllPollQuery } from './queries/get-all-polls.query';

export const router = Router();

router.post('/', createPollCommand);

router.get('/:id', getPollQuery);

router.post('/:id/vote', submitPollVoteCommand);

router.get('/', getAllPollQuery)
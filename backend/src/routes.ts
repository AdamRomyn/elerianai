
import { router as pollsRouter } from './polls/polls.routes';
import { Router } from 'express';

export const mainRouter = Router();

mainRouter.use('/polls', pollsRouter);
import { Router } from 'express';
import videosRouter from './videos';
import matchesRouter from './matches';
import usersRouter from './users'

const router = Router()

router.use('/videos', videosRouter);
router.use('/matches', matchesRouter);
router.use('/users', usersRouter);

export default router;
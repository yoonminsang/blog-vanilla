import { Router } from 'express';
import authRouter from './auth';
import postRouter from './post';

const router = Router();

router.use('/auth', authRouter);
router.use('/post', postRouter);

export default router;

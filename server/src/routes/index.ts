import { Router } from 'express';
import authRouter from './auth';
import commentRouter from './comment';
import postRouter from './post';

const router = Router();

router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

export default router;

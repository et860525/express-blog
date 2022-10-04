import { Router } from 'express';
import PostViewController from './post.controller';

const router = Router();
const controller = new PostViewController();

router.get('/', controller.getPosts);
router.get('/post/:title', controller.getPost);

export default router;

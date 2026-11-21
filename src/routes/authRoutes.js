import {Router} from 'express';
import {login} from '../controllers/authController.js';
const router = Router();

// api/auth


// api/auth/login => {post : login user}
router.post('/login', login);

export default router;
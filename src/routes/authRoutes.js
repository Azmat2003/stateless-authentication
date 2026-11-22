import {Router} from 'express';
import {login, loginCookie} from '../controllers/authController.js';
const router = Router();

// api/auth


// api/auth/login => {post : login user}
router.post('/login', loginCookie);

export default router;
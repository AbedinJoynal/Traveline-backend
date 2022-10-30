import express from 'express';
const router = express.Router();
import { getAllUsers, signup, login} from '../controllers/user-controller.js';

router.get('/', getAllUsers);
router.get('/signup', signup);
router.get('/login',login);
export default router;
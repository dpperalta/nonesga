import { Router } from 'express';

import { login, validateUser, logout } from '../controllers/login.controller';

const mAuth = require('../middlewares/authentication');

const router = Router();

// Routes without params
router.post('/', login);
router.get('/valida', [mAuth.tokenValidation, mAuth.adminValidation], validateUser);

// Routes with params
router.delete('/logout/:userID', mAuth.tokenValidation, logout);

export default router;
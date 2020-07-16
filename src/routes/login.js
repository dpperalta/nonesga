import { Router } from 'express';

import { login, validateUser } from '../controllers/login.controller';

const mAuth = require('../middlewares/authentication');

const router = Router();

// Routes without params
router.post('/', login);
router.get('/valida', [mAuth.tokenValidation, mAuth.adminValidation], validateUser);

export default router;
import { Router } from 'express';

import { login, validateUser, logout, tokenRenew } from '../controllers/login.controller';

import mAuth from '../middlewares/authentication';
//const mAuth = require('../middlewares/authentication');

const router = Router();

// Routes without params
router.post('/', login);
router.get('/renew', [mAuth.tokenValidation], tokenRenew);

// Routes with params
router.delete('/logout/:userID', mAuth.tokenValidation, logout);

export default router;
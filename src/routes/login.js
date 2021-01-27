import { Router } from 'express';

import { login, validateUser, logout, tokenRenew } from '../controllers/login.controller';

import mAuth from '../middlewares/authentication';
//const mAuth = require('../middlewares/authentication');
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/fieldValidation';

const router = Router();

// Routes without params
router.post('/', [
        check('email', 'eMail is required').not().isEmpty(),
        check('email', 'eMail is invalid').isEmail(),
        check('pass', 'Password is required').not().isEmpty(),
        fieldValidation
    ],
    login
);

router.get('/renew', [mAuth.tokenValidation], tokenRenew);

// Routes with params
router.delete('/logout/:userID', mAuth.tokenValidation, logout);

export default router;
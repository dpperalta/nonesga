import { Router } from 'express';

import mAuth from '../middlewares/authentication';

import { createCountry,
         getCountries } from '../controllers/country.controller';

const router = Router();

// Routes without params
router.post('/', [ mAuth.tokenValidation, mAuth.adminValidation ], createCountry);
router.get('/', mAuth.tokenValidation, getCountries );

export default router;
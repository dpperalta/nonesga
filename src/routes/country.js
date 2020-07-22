import { Router } from 'express';

import mAuth from '../middlewares/authentication';

import { createCountry,
         getCountries,
         changeActivationCountry,
         updateCountry,
         getCountry,
         deleteCountry } from '../controllers/country.controller';

const router = Router();

// Routes without params
router.post('/', [ mAuth.tokenValidation, mAuth.adminValidation ], createCountry);
router.get('/', mAuth.tokenValidation, getCountries );

// Routes with params
router.put('/:countryID', [ mAuth.tokenValidation, mAuth.adminValidation ], updateCountry);
router.post('/:countryID', [ mAuth.tokenValidation, mAuth.adminValidation ], changeActivationCountry);
router.get('/:countryID', mAuth.tokenValidation, getCountry);
router.delete('/:countryID', [ mAuth.tokenValidation, mAuth.superAdminValidation ], deleteCountry);

export default router;
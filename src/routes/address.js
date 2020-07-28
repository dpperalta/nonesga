import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

// Import methods from controller
import {
    createAddress,
    getAddresses,
    updateAddress
} from '../controllers/address.controller';

// Routes without params
router.post('/', mAuth.tokenValidation, createAddress);
router.get('/', mAuth.tokenValidation, getAddresses);

// Routes with params
router.put('/:addressID', mAuth.tokenValidation, updateAddress);

export default router;
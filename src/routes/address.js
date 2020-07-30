import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

// Import methods from controller
import {
    createAddress,
    getAddresses,
    updateAddress,
    getAddress,
    changeActivationAddress,
    deleteAddress,
    getAddressPerson
} from '../controllers/address.controller';

// Routes without params
router.post('/', mAuth.tokenValidation, createAddress);
router.get('/', mAuth.tokenValidation, getAddresses);

// Routes with params
router.put('/:addressID', mAuth.tokenValidation, updateAddress);
router.get('/:addressID', mAuth.tokenValidation, getAddress);
router.post('/:addressID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationAddress);
router.delete('/:addressID', [mAuth.tokenValidation, mAuth.adminValidation], deleteAddress);
router.get('/person/:personID', [mAuth.tokenValidation], getAddressPerson);

export default router;
import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createPhoneOperator,
    getPhoneOperators,
    getPhoneOperator,
    changeActivationPhoneOperator,
    updatePhoneOperator,
    deletePhoneOperator
} from '../controllers/phoneOperator';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.superAdminValidation], createPhoneOperator);
router.get('/', mAuth.tokenValidation, getPhoneOperators);

// Routes with params
router.get('/:operatorID', mAuth.tokenValidation, getPhoneOperator);
router.post('/:operatorID', [mAuth.tokenValidation, mAuth.superAdminValidation], changeActivationPhoneOperator);
router.put('/:operatorID', [mAuth.tokenValidation, mAuth.superAdminValidation], updatePhoneOperator);
router.delete('/:operatorID', [mAuth.tokenValidation, mAuth.superAdminValidation], deletePhoneOperator);

export default router;
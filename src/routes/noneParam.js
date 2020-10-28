import { Router } from 'express';
import mAuth from '../middlewares/authentication';

// Imports of controllers
import {
    createParametrization,
    getParametrizations,
    getParametrizationByID,
    updateParametrization,
    changeActivationParam,
    deleteParametrization
} from '../controllers/noneParam.controller';

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.superAdminValidation], createParametrization);
router.get('/', [mAuth.tokenValidation, mAuth.superAdminValidation], getParametrizations);

// Routes with params
router.get('/:paramID', [mAuth.tokenValidation, mAuth.superAdminValidation], getParametrizationByID);
router.put('/:paramID', [mAuth.tokenValidation, mAuth.superAdminValidation], updateParametrization);
router.post('/:paramID', [mAuth.tokenValidation, mAuth.superAdminValidation], changeActivationParam);
router.delete('/:paramID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteParametrization);

export default router;
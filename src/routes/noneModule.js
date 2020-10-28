import { Router } from 'express';
import mAuth from '../middlewares/authentication';

// Imports
import {
    createModule,
    createSubModule,
    getModules,
    getSubModules,
    getModuleByID,
    getSubModuleByID,
    getSubmodulesOfModule,
    updateModule,
    updateSubmodule,
    deleteModule,
    deleteSubmodule,
    changeActivationModule
} from '../controllers/noneModule.controller';

const router = Router();

// Routes without params
// Modules
router.post('/', [mAuth.tokenValidation, mAuth.superAdminValidation], createModule);
router.get('/', [mAuth.tokenValidation, mAuth.superAdminValidation], getModules);
// Submodules
router.post('/submodule', [mAuth.tokenValidation, mAuth.superAdminValidation], createSubModule);
router.get('/submodule', [mAuth.tokenValidation, mAuth.superAdminValidation], getSubModules);

// Routes with params
router.post('/:moduleID', [mAuth.tokenValidation, mAuth.superAdminValidation], changeActivationModule);
// Modules
router.get('/:moduleID', [mAuth.tokenValidation, mAuth.superAdminValidation], getModuleByID);
router.get('/module/submodule/:moduleID', [mAuth.tokenValidation, mAuth.superAdminValidation], getSubmodulesOfModule);
router.put('/:moduleID', [mAuth.tokenValidation, mAuth.superAdminValidation], updateModule);
router.delete('/:moduleID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteModule);
// Submodules
router.get('/submodule/:submoduleID', [mAuth.tokenValidation, mAuth.superAdminValidation], getSubModuleByID);
router.put('/submodule/:submoduleID', [mAuth.tokenValidation, mAuth.superAdminValidation], updateSubmodule);
router.delete('/submodule/:submoduleID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteSubmodule);

export default router;
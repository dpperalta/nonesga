import { Router } from 'express';
import { createPersonType, 
         getPersonTypes, 
         getActivePersonTypes, 
         updatePersonType,
         inactivatePersonType,
         activatePersonType,
         deletePersonType } from '../controllers/personType.controller';

const router = Router();

// Routes without params 
router.post('/', createPersonType);
router.get('/', getPersonTypes);
router.get('/active', getActivePersonTypes);

// Routes with params
router.put('/:personTypeID', updatePersonType);
router.put('/inactivate/:personTypeID', inactivatePersonType);
router.put('/activate/:personTypeID', activatePersonType);
router.delete('/:personTypeID', deletePersonType);

export default router;
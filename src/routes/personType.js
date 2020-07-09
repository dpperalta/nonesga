import { Router } from 'express';
import { createPersonType, getPersonTypes, getActivePersonTypes } from '../controllers/personType.controller';

const router = Router();

router.post('/', createPersonType);
router.get('/', getPersonTypes);
router.get('/active', getActivePersonTypes);

export default router;

/*
const router = Router();

//Crete routes
router.post('/', createRole);
router.get('/', getRoles);
router.get('/number', getActiveRolesWithCounter);
router.get('/active', getActiveRolesWitoutCounter);

// Routes with params
router.put('/:roleID', updateRole);
router.put('/inactivate/:roleID', inactivateRole);
router.put('/activate/:roleID', activateRole);
router.delete('/:roleID', deleteRole);

export default router;
*/
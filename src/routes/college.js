import { Router } from 'express';


import {
    createCollege
} from '../controllers/college.controller';

const router = Router();

// Routes without params
router.post('/', createCollege);

export default router;
/*

const router = Router();

// Routes without params
router.post('/', createPerson);
router.get('/', getPeople);
router.get('/active', getActivePeople);
router.get('/inactive', getInactivePeople);
router.get('/activeType', getActivePeopleType);

//Routes with params
router.put('/:personID', updatePerson);
router.put('/inactivate/:personID', inactivatePerson);
router.put('/activate/:personID', activatePerson);
router.delete('/:personID', deletePerson);
router.get('/:personID', getPerson);

export default router;
*/
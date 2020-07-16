import { Router } from 'express';
import {
    createPerson,
    getPeople,
    getActivePeople,
    getInactivePeople,
    getActivePeopleType,
    updatePerson,
    inactivatePerson,
    activatePerson,
    deletePerson,
    getPerson
} from '../controllers/person.controller';

const mAuth = require('../middlewares/authentication');

const router = Router();

// Routes without params
router.post('/', mAuth.tokenValidation, createPerson);
router.get('/', mAuth.tokenValidation, getPeople);
router.get('/active', mAuth.tokenValidation, getActivePeople);
router.get('/inactive', mAuth.tokenValidation, getInactivePeople);
router.get('/activeType', mAuth.tokenValidation, getActivePeopleType);

//Routes with params
router.put('/:personID', mAuth.tokenValidation, updatePerson);
router.put('/inactivate/:personID', mAuth.tokenValidation, inactivatePerson);
router.put('/activate/:personID', mAuth.tokenValidation, activatePerson);
router.get('/:personID', mAuth.tokenValidation, getPerson);
router.delete('/:personID', [mAuth.tokenValidation, mAuth.adminValidation], deletePerson);

export default router;
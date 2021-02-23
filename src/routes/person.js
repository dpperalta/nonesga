import { Router } from 'express';
import { check } from 'express-validator';
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
    getPerson,
    findPerson,
    getPeopleWhitoutUser
} from '../controllers/person.controller';
import { fieldValidation } from '../middlewares/fieldValidation';

const mAuth = require('../middlewares/authentication');

const router = Router();

// Routes without params
router.post('/', [
    check('names', 'Names are required').not().isEmpty(),
    check('lastNames', 'Lastnames are required').not().isEmpty(),
    check('sex', 'Sex is invalid').isIn(['Male', 'Female', 'Masculino', 'Femenino', 'M', 'F', 'male', 'female']),
    check('birthdate', 'Birthdate is invalid').isDate(),
    fieldValidation,
    mAuth.tokenValidation
], createPerson);
router.get('/', mAuth.tokenValidation, getPeople);
router.get('/active', mAuth.tokenValidation, getActivePeople);
router.get('/inactive', mAuth.tokenValidation, getInactivePeople);
router.get('/activeType', mAuth.tokenValidation, getActivePeopleType);

router.get('/without', [mAuth.tokenValidation, mAuth.adminValidation], getPeopleWhitoutUser);

//Routes with params
router.put('/:personID', mAuth.tokenValidation, updatePerson);
router.put('/inactivate/:personID', mAuth.tokenValidation, inactivatePerson);
router.put('/activate/:personID', mAuth.tokenValidation, activatePerson);
router.get('/:personID', mAuth.tokenValidation, getPerson);
router.delete('/:personID', [mAuth.tokenValidation, mAuth.superAdminValidation], deletePerson);
router.get('/people/find', mAuth.tokenValidation, findPerson);

export default router;
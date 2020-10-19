import { Router } from 'express';

import mAuth from '../middlewares/authentication';

// Controller imports
import {
    createHoliday,
    getHolidays,
    searchHolidayByNameOrDetail,
    searchHolidayByLocation,
    searchHolidayByDate,
    getNationalHolidays,
    getHoliday,
    updateHoliday,
    changeActivationHoliday,
    deleteHoliday
} from '../controllers/holiday.controller';

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createHoliday);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getHolidays);
router.get('/search', mAuth.tokenValidation, searchHolidayByNameOrDetail);
router.get('/search/location', mAuth.tokenValidation, searchHolidayByLocation);
router.get('/search/date', mAuth.tokenValidation, searchHolidayByDate);

// Routes with params
router.get('/:holidayID', mAuth.tokenValidation, getHoliday);
router.get('/country/:countryID', mAuth.tokenValidation, getNationalHolidays);
router.put('/:holidayID', [mAuth.tokenValidation, mAuth.adminValidation], updateHoliday);
router.post('/:holidayID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationHoliday);
router.delete('/:holidayID', [mAuth.tokenValidation, mAuth.adminValidation], deleteHoliday);

export default router;
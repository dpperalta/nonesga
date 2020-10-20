import { Router } from 'express';

import mAuth from '../middlewares/authentication';

import {
    generateCalendar,
    getAllCalendarDays,
    getCalendarDayByID,
    getCalendarDayByDate,
    updateCalendarDay,
    changeToInactiveDay,
    deleteYear,
} from '../controllers/calendar.controller'

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], generateCalendar);
router.get('/', mAuth.tokenValidation, getAllCalendarDays);
router.put('/pastDay/', [mAuth.tokenValidation, mAuth.superAdminValidation], changeToInactiveDay);

// Routes with params
router.get('/:calendarID', mAuth.tokenValidation, getCalendarDayByID);
router.get('/date/:date', mAuth.tokenValidation, getCalendarDayByDate);
router.put('/:calendarID', [mAuth.tokenValidation, mAuth.adminValidation], updateCalendarDay);
router.delete('/:year', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteYear);

export default router;
import { Router } from 'express';

import mAuth from '../middlewares/authentication';

import {
    generateCalendar,
    getAllCalendarDays,
    getCalendarDayByID,
    getCalendarDayByDate,
    updateCalendarDay
} from '../controllers/calendar.controller'

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], generateCalendar);
router.get('/', mAuth.tokenValidation, getAllCalendarDays);

// Routes with params
router.get('/:calendarID', mAuth.tokenValidation, getCalendarDayByID);
router.get('/date/:date', mAuth.tokenValidation, getCalendarDayByDate);
router.put('/:calendarID', [mAuth.tokenValidation, mAuth.adminValidation], updateCalendarDay);

export default router;
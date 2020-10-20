import { Router } from 'express';

import mAuth from '../middlewares/authentication';

import {
    generateCalendar
} from '../controllers/calendar.controller'

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], generateCalendar);

// Routes with params

export default router;
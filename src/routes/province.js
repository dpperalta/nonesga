import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import { createProvince } from '../controllers/province.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createProvince);

export default router;
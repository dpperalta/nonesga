import { Router } from 'express';


import {
    createCollege,
    getColleges,
    changeActivationCollege,
    getStatusColleges,
    getCollege
} from '../controllers/college.controller';

const router = Router();

// Routes without params
router.post('/', createCollege);
router.get('/', getColleges);

// Routes with params
router.post('/:collegeID', changeActivationCollege);
router.get('/type/:type', getStatusColleges);
router.get('/:collegeID', getCollege);

export default router;
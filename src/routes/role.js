/*
import { Router } from 'express';

const router = Router();

import { createTask, getTasks, deleteTask, updateTask, getOneTask, getTaskByProject } from '../controllers/task.controller';

// Creación de rutas
router.post('/', createTask);
router.get('/', getTasks);

// /api/task/:id
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.get('/:id', getOneTask);

router.get('/project/:projectid', getTaskByProject);

export default router;
*/
import { Router } from 'express';

import { createRole, 
         getRoles, 
         getActiveRolesWitoutCounter, 
         updateRole, 
         getActiveRolesWithCounter, 
         inactivateRole, 
         activateRole,
         deleteRole } from '../controllers/role.controller';

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
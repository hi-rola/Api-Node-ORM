import { Router } from 'express';
const router = Router();

import { createTask, getTasks, getTaskById, deleteTask, updateTask, getTaskByProject} from '../controllers/task.controller';


// /api/tasks
router.post('/', createTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.get('/:id', getTaskById);

// /api/tasks/projects/projectId
router.get('/projects/:projectid', getTaskByProject);

export default router;
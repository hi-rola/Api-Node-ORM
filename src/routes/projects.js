import { Router } from 'express';
const router = Router();

import { createProject,  getProjects, getProjectById, deleteProject, updateProject} from '../controllers/project.controller';


// /api/projects
router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.delete('/:id', deleteProject);
router.put('/:id', updateProject);

export default router;
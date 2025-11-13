import express from 'express';
import { create, getById, list, remove, update } from '../controller/toDoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/',authMiddleware, list);

router.get('/:id',authMiddleware,  getById);

router.post('/',authMiddleware,  create);

router.put('/:id',authMiddleware,  update);

router.delete('/:id',authMiddleware,  remove);

export default router;
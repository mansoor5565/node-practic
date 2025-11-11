import express from 'express';
import router from express.Router();
import { create, getById, list, remove, update } from '../controller/toDoController';


router.get('/todos', list);

router.get('/todos/:id', getById);

router.post('/todos', create);

router.put('/todos/:id', update);

router.delete('/todos/:id', remove);

export default router;
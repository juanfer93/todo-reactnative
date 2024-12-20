import { Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controller/controller';

const router = Router();

router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.patch('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;

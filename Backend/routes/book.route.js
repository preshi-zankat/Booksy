import express from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/book.controller.js';
import { verifyJwt } from '../middleware/Authentication.js';
import authorizeRole from '../middleware/AuthorizeRoles.js';
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/',verifyJwt,authorizeRole('admin'), createBook);
router.put('/:id',verifyJwt, updateBook);
router.delete('/:id',verifyJwt, deleteBook);
export default router;
import express from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/book.controller.js';
import { verifyJwt } from '../middleware/Authentication.js';
const router = express.Router();


router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/',verifyJwt, createBook);
router.put('/:id',verifyJwt, updateBook);
router.delete('/:id',verifyJwt, deleteBook);
export default router;
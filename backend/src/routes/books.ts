import { Router } from 'express';
import { getBookDetails, getBooks } from '../controllers/books';

const booksRouter = Router();

booksRouter.get('/', getBooks);
booksRouter.get('/:id(\\d+)', getBookDetails);

export default booksRouter;

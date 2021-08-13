import { Router } from 'express';

import booksRouter from './books';

const appRouter = Router();

appRouter.use('/books', booksRouter);

export default appRouter;

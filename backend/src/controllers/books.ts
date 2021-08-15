import { Response, Request, NextFunction } from 'express';

import { fetchAllBooks, fetchBookById } from '../services/books';

/**
 * Handles getBooks request.
 *
 * @param {Request} req
 * @param {Response} res
 */
export async function getBooks(req: Request, res: Response) {
  return fetchAllBooks().then((data) => res.status(200).json(data));
}

/**
 * Handles getBookDetails request.
 *
 * @param {Request} req
 * @param {Response} res
 */
export async function getBookDetails(req: Request, res: Response, next: NextFunction) {
  const id = +req.params.id as number;

  return fetchBookById(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
}

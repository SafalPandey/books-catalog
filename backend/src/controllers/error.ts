import HttpStatus from 'http-status-codes';
import { Response, Request, NextFunction } from 'express';

import logger from '../utils/logger';

/**
 * Error response middleware for 404 not found.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(HttpStatus.NOT_FOUND).json({
    code: HttpStatus.NOT_FOUND,
    message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
  });
}

/**
 * Handles error during request.
 *
 * @param {Request} req
 * @param {Response} res
 */
export async function defaultError(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error('An error occurred: ', err);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
  });
}

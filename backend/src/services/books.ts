import Book from "../models/book";
import logger from "../utils/logger";

/**
 * Fetches all books list from db.
 */
export async function fetchAllBooks() {
  logger.info('Fetching all books from DB.');
  const data = await new Book().fetchAll({ columns: ['id', 'title', 'year'] });

  logger.info(`Fetched ${data.length} books from DB.`);

  return { data };
}

/**
 * Fetches specific book by id from db.
 */
export async function fetchBookById(id: number) {
  logger.info(`Fetching book details for id: ${id} from DB.`)
  const data = await new Book({ id }).fetch({ columns: ['id', 'title', 'year', 'description'] });

  return { data };
}

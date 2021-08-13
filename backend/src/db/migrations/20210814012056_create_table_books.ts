import * as Knex from 'knex';

/**
 * Create books table.
 *
 * @param {Knex} knex
 * @returns {Knex.SchemaBuilder}
 */
export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.integer('year');
    table.text('description');
    table.timestamps(true, true);
  });
}

/**
 * Drop books table.
 *
 * @param {Knex} knex
 * @returns {Knex.SchemaBuilder}
 */
export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('books');
}

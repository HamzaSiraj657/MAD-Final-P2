exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('Email').notNullable().unique();
    table.string('password').notNullable();
    table.string('role').defaultTo('user');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

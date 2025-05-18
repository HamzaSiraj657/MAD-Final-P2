exports.up = function(knex) {
  return knex.schema.createTable('products', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.string('image').notNullable();
   
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('products');
};

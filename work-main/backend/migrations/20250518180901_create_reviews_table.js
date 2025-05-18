exports.up = function(knex) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable();
    table.string('user_email', 255);
    table.text('comment');

    
    table.foreign('product_id')
         .references('id')
         .inTable('products')
         .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('reviews');
};

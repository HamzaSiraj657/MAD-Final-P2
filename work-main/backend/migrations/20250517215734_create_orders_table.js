exports.up = function(knex) {
  return knex.schema.createTable('orders', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();         
    table.string('address').notNullable();      
    table.string('phone').notNullable();        
    table.decimal('total', 10, 2).notNullable(); 
    table.json('products').notNullable();       
    table.string('order_date').notNullable();   
    table.string('order_time').notNullable();   
    table.enum('status', ['pending', 'shipped', 'delivered', 'cancelled'])
         .defaultTo('pending');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders');
};

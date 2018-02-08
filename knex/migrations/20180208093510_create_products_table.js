
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.integer('price').notNullable();
    table.integer('inventory').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};

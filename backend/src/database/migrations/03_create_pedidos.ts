import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('pedidos', table => {
        table.increments('id_pedido').primary();
        table.float('total').notNullable();
        table.integer('quantidade').notNullable();
        table.string('status').notNullable();

        table.integer('id_prato')
        .references('id_prato')
        .inTable('pratos');

        table.string('cpf_cliente')
        .references('cpf')
        .inTable('cliente');
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('pedidos');
}
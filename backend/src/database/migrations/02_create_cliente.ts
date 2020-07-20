import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('cliente', table => {
        table.string('cpf').primary();
        table.string('nome_cliente').notNullable();
        table.string('sobrenome').notNullable();
        table.string('telefone').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('cliente');
}
import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('categoria', table =>{
        table.increments('id_categoria').primary();
        table.string('nome').notNullable();
        table.string('imagem').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('categoria');
}
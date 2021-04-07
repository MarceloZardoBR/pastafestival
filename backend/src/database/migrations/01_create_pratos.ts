import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('pratos', table => {
        table.increments('id_prato').primary();
        table.string('nome').notNullable();
        table.float('preco').notNullable();
        table.string('imagem').notNullable();
        
        table.integer('id_categoria')
        .notNullable()
        .references('id_categoria')
        .inTable('categoria')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('pratos');
}
import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('endereco', table => {
        table.increments('id_endereco').primary();
        table.string('rua').notNullable;
        table.integer('numero').notNullable;
        table.string('bairro').notNullable;
        table.string('cidade').notNullable;
        table.string('cep').notNullable;

        table.string('cpf_cliente')
            .references('cpf')
            .inTable('cliente');
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('endereco');
}
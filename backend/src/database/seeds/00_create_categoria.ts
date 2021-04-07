import Knex from 'knex';

export async function seed(knex: Knex){
    return knex('categoria').insert([
        {nome: "Pizza", imagem: 'pizza.png'},
        {nome: "Macarrões", imagem: 'massa.png'},
        {nome: "Pastéis", imagem: 'pastel.png'},
        {nome: "Bebidas", imagem: 'coca.png'},
    ])
}
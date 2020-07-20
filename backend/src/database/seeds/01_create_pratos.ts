import Knex from 'knex';

export async function seed(knex: Knex){
    return knex('pratos').insert([
        {nome: 'Pizza de Mussalera', preco: 25.00, imagem: 'pizza-mussa.jpg', id_categoria: 1},
        {nome: 'Pizza de Atum', preco: 28.00, imagem: 'pizza-atum.jpg', id_categoria: 1},
        {nome: 'Pizza de Calabresa', preco: 27.00, imagem: 'pizza-calabresa.jpg', id_categoria: 1},
        
        {nome: 'Macarrão do Chef', preco: 40.00, imagem: 'macarrao-chef.jpg', id_categoria: 2},
        
        {nome: 'Pastel de Carne', preco: 5.00, imagem: 'pastel-carne.jpg', id_categoria: 3},
        {nome: 'Pastel de Queijo', preco: 5.00, imagem: 'pastel-queijo.jpg', id_categoria: 3},
        {nome: 'Pastel de Frango', preco: 5.00, imagem: 'pastel-frango.jpg', id_categoria: 3},

        {nome: 'Coca', preco: 8.00, imagem: 'coca-geladin.jpg', id_categoria: 4},
        {nome: 'Guaraná', preco: 4.00, imagem: 'guarana.jpg', id_categoria: 4},
        {nome: 'Fanta', preco: 7.00, imagem: 'fanta.jpg', id_categoria: 4},
    ])
}
export interface ICart{
    id_pedido: number,
    total: number,
    quantidade: number,
    status: string,
    id_prato: number,
    cpf_cliente: string,
    nome: string,
    nome_cliente: string,
    sobrenome: string,
    preco: number,
    imagem: string,
}

export interface IClientAdress{
    rua: string,
    numero: number,
    cidade: string,
    bairro: string,
    telefone: number,
    cep: string
}
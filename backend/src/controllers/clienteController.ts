import { Request, Response } from 'express';
import knex from '../database/connection';

import { IPedido } from '../commons/Interfaces';

const ClienteController = {
    async loginClient(req: Request, res: Response){
        const { cpf } = req.body;

        const existsClient = await knex('cliente').where('cpf', cpf).first();

        if(existsClient){
            res.send(existsClient);

        }else{
            res.status(404).send('User Does not exists');
        }

    },

    async createClient(req: Request, res:Response){

        const {cpf, nome_cliente, sobrenome, telefone} = req.body;

        const data = {cpf, nome_cliente, sobrenome, telefone}

        const trx = await knex.transaction();

        await trx('cliente').insert(data)

        const pedido = {
            total: 0.0,
            quantidade: 0,
            status: "Aberto",
            cpf_cliente: data.cpf
        }

        await trx('pedidos').insert(pedido);

        await trx.commit();

        res.send(data);

    },

    async clientOrder(req: Request, res: Response){
        const { cpf } = req.query;
        const status:String = 'Aberto';

        const order = await knex<IPedido>('pedidos')
            .join('cliente', 'pedidos.cpf_cliente', '=', 'cliente.cpf')
            .join('pratos', 'pedidos.id_prato', '=', 'pratos.id_prato')
            .where('pedidos.cpf_cliente', '=' , String(cpf))
            .andWhere('status', '=' , status)
            .select('*');

        if(order){
            res.send(order);
        }

    },

    async clientAddOrder(req: Request, res: Response){
        const { cpf, idPrato } = req.body;

        const pratoInfo = await knex('pratos')
                .select('*')
                .where('pratos.id_prato', '=', idPrato)
                .first();

        const existsPlate = await knex('pedidos')
            .select('*')
            .where('pedidos.cpf_cliente', '=', cpf)
            .orWhere('pedidos.id_prato', '=', idPrato)
            .andWhere('pedidos.status', '=', 'Aberto');

        let prato = existsPlate.find(prato => prato.id_prato == idPrato);

        if(prato){
            prato.quantidade = prato.quantidade + 1;
            prato.total = prato.total + pratoInfo.preco;
            delete prato.id_pedido;

            await knex('pedidos')
            .update(prato)
            .where('pedidos.cpf_cliente', '=', cpf)
            .andWhere('pedidos.id_prato', '=', idPrato)
            .andWhere('pedidos.status', '=', 'Aberto');

        }else{ 

            const newPrato = {
                id_prato: idPrato,
                quantidade: 1,
                total: pratoInfo.preco,
                cpf_cliente: cpf,
                status: 'Aberto'
            }

            await knex('pedidos').insert(newPrato);
        }

    },

    async clientRemovePlate(req: Request, res: Response){
        const { id_pedido } = req.body;

        try {
            await knex('pedidos')
            .where('pedidos.id_pedido', '=', id_pedido)
            .del();
        } catch (err){
            res.status(500).send(err);
        } finally{
            res.status(200).send('Success!');
        }
    },

    async clientChangePlateAmount(req: Request, res: Response){
        const { id_pedido, newQuantidade } = req.body;

        if(newQuantidade === 0){
            try {
                await knex('pedidos')
                .where('pedidos.id_pedido', '=', id_pedido)
                .del();
            } catch (err){
                res.status(500).send(err);
            } finally{
                res.status(200).send('Plate Removed!');
            }
        }
        
        try{
            await knex('pedidos')
                .where('id_pedido', '=', id_pedido)
                .update('quantidade', newQuantidade);
        }catch(err){
            res.status(500).send(err);
        }finally{
            res.status(200).send('Order Updated!');
        }

    },

    async clientGetAdress(req: Request, res: Response){
        const { cpf } = req.query;
        
        const endereco = await knex.table('endereco')
            .select('*')
            .where('endereco.cpf_cliente','=', String(cpf))
            .first();

        if(endereco){
            res.status(200).send(endereco);
        }else{
            res.status(404).send('Address Doesnt Exists');
        }
    },

    async clientUpdateAddress(req: Request, res: Response){
        const { address, cpf } = req.body;

        const endereco = await knex.table('endereco')
            .select('*')
            .where('endereco.cpf_cliente','=', String(cpf))
            .first();

        if(!endereco){
            const newAddress = {
                ...address,
                cpf_cliente: cpf
            }

            await knex.table('endereco')
                .insert(newAddress);
            
        }else{
            try{
                knex.table('endereco')
                    .update(address)
                    .where('endereco.cpf_cliente', '=', String(cpf))
            }catch(err){
                res.status(500).send(err);
            }finally{
                res.status(200).send('Address Updated');
            }
        }
    }
}

export default ClienteController;
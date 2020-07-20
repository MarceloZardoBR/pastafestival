import { Request, Response } from 'express';
import knex from '../database/connection';

const CardapioController = {
    async getCardapio(req: Request, res: Response){

        const items = await knex('pratos').select('*');

        res.json(items);
    },

    async getCategory(req: Request, res: Response){

        const categories = await knex('categoria').select('*');

        res.json(categories);
    }
}

export default CardapioController;
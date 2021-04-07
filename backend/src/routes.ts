import express from 'express';
import CardapioController from './controllers/cardapioController';
import ClienteController from './controllers/clienteController'

const Routes = express.Router();

Routes.post('/cliente/login', ClienteController.loginClient);
Routes.post('/cliente/create', ClienteController.createClient);
Routes.post('/cliente/order/add', ClienteController.clientAddOrder);
Routes.get('/cliente/order/', ClienteController.clientOrder);
Routes.delete('/cliente/order/remove', ClienteController.clientRemovePlate);
Routes.put('/cliente/order/change', ClienteController.clientChangePlateAmount);
Routes.get('/cliente/address/', ClienteController.clientGetAdress);
Routes.put('/cliente/address/update', ClienteController.clientUpdateAddress);

Routes.get('/cardapio/categorias', CardapioController.getCategory);
Routes.get('/cardapio/pratos/', CardapioController.getCardapio);

export default Routes;
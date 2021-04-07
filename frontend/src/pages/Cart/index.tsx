import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../common/EndpoinURL';
import { ICart } from '../../common/Interfaces';
import CartHeader from '../../components/cart-header';
import CheckoutAddress from '../../components/CheckoutAddress';
import { FcPrevious, FcNext } from "react-icons/fc";
import { useHistory } from 'react-router-dom';

import Remove from '../../assets/close.svg';
import './styles.css';

const Cart: React.FC = () => {

    const cpf = localStorage.getItem('user_cpf');
    const [cart, setCart] = useState<ICart[]>([]);
    const [total, setTotal] = useState<number>(0);
    const history = useHistory();

    useEffect(() => {
        fetchUserOrders();
    }, [])

    useEffect(() => {
        if(!cpf){
            history.push('/cliente/register/');
        }
    },[])

    useEffect(() => {
        let value = cart.map(item => {
            return item.preco * item.quantidade;  
        });
        
        if(value.length){
            setTotal(value.reduce((a,b) => a + b));
        }else if(!cart.length){
            setTotal(0);
        }
    },[cart])

    const fetchUserOrders = useCallback(() => {
        axios.get(`${BASE_URL}/cliente/order/?cpf=${cpf}`)
            .then(res => {
                let order: ICart[] = res.data
                setCart(order.sort((a, b) => a.id_pedido - b.id_pedido));
            }).catch(err => {
                console.log(err);
            })
    }, [cpf])

    const onHandleRemovePlate = (id_pedido: number) => {
        axios.delete(`${BASE_URL}/cliente/order/remove`, {
            data: {
                id_pedido: id_pedido
            }
        }).then(res => {
            if (res.status == 200) {
                fetchUserOrders();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const onIncreaseAmount = (id_pedido: number, quantidade: number) => {
        let newQuantidade = quantidade + 1;

        axios.put(`${BASE_URL}/cliente/order/change`, {
            id_pedido,
            newQuantidade
        }).then(res => {
            if (res.status == 200) {
                fetchUserOrders();
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const onDecreaseAmount = (id_pedido: number, quantidade: number) => {
        let newQuantidade = quantidade - 1;

        axios.put(`${BASE_URL}/cliente/order/change`, {
            id_pedido,
            newQuantidade
        }).then(res => {
            if (res.status == 200) {
                fetchUserOrders();
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div id="cart-container">
            <CartHeader />
            <div className="split-container">
                <div className="order-products">
                    {cart ? (
                        <ul>
                            {cart.map(c => (
                                <li key={c.id_pedido}>
                                    <img className="image-ctn" src={`${BASE_URL}/uploads/${c.imagem}`} />
                                    <footer>
                                        <div className="name-price-field">
                                            <p>{c.nome}</p>
                                            <p>R$ {c.preco}</p>
                                            <div className="qtd-change">
                                                <p>Quantidade: </p>
                                                <button onClick={() => onDecreaseAmount(c.id_pedido, c.quantidade)}>
                                                    <FcPrevious size={15} />
                                                </button>
                                                <p>{c.quantidade}</p>
                                                <button onClick={() => onIncreaseAmount(c.id_pedido, c.quantidade)}>
                                                    <FcNext size={15} />
                                                </button>
                                            </div>
                                        </div>
                                        <span>
                                            <button onClick={() => onHandleRemovePlate(c.id_pedido)}>
                                                <img src={Remove} />
                                            </button>
                                        </span>
                                    </footer>
                                </li>
                            ))}
                        </ul>
                    ) : (
                            <div>
                                <p>Você não possui nenhum pedido</p>
                            </div>
                        )}
                </div>
                <div className="finish-order">
                    <CheckoutAddress total={total} cpf={cpf!}/>
                </div>
            </div>
        </div>
    );
}

export default Cart;
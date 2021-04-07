import React, { useState, useEffect } from 'react';
import { IPratos } from '../pages/Main/index';
import { BASE_URL } from '../common/EndpoinURL';
import addItemToCart from '../services/AddItemCart';
import Modal from '../components/Modal';

import './plate-preview.css';

interface OwnProps {
    pratos?: IPratos[]
}

const PlatePreview = (props: OwnProps) => {

    const userCpf = localStorage.getItem('user_cpf');
    const [openModal, setOpenModal] = useState(false);

    const onSelectProduct = (id: number) => {
        setOpenModal(true);

        if(userCpf){
            addItemToCart(id, userCpf);
        }else{
            setOpenModal(false)
            alert('Necessário acessar a conta');
        }
    }

    return (
        <div id="platePreview-container">
            <Modal show={openModal} titulo={'Sucesso'} message={'Prato Adicionado ao Carrinho'} onClose={setOpenModal} />
            {props.pratos ? (
                <ul>
                    {props.pratos.map(prato => (
                        <li key={prato.id_prato}>
                            <img className="image-ctn" src={`${BASE_URL}/uploads/${prato.imagem}`} />
                            <footer>
                                <div className="name-price-field">
                                    <p>{prato.nome}</p>
                                    <p>R$ {prato.preco}</p>
                                </div>
                                <span>
                                    <button onClick={() => onSelectProduct(prato.id_prato)}
                                        disabled={openModal}>
                                        Comprar
                                    </button>
                                </span>
                            </footer>
                        </li>
                    ))}
                </ul>
            ) : (
                    <p>Nenhum prato nessa categoria</p>
                )}
        </div>
    )
}

export default PlatePreview;
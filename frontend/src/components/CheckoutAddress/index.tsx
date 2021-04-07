import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { FcExpand } from 'react-icons/fc';
import { IClientAdress } from '../../common/Interfaces';
import { BASE_URL } from '../../common/EndpoinURL';
import Axios from 'axios';

import './styles.css';

interface OwnProps {
    total: number,
    cpf: string
}

const CheckoutAddress: React.FC<OwnProps> = (props) => {

    const [displayAddress, setDisplayAddress] = useState(true);
    const [address, setAddress] = useState({
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        telefone: '',
        cep: ''
    });

    useEffect(() => {
        Axios.get(`${BASE_URL}/cliente/address/?cpf=${props.cpf}`)
        .then(res => {
            setAddress(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[])

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAddress({ ...address, [name]: value })
    }

    const onSubmitAddress = () =>{
        const { rua, numero, bairro, cidade, cep} = address;
        const newAddress = {
            rua,
            numero,
            bairro,
            cidade,
            cep
        }
        Axios.put(`${BASE_URL}/cliente/address/update`, {
            address: newAddress,
            cpf: props.cpf
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div id="checkinfo-container">
            <header>
                <h3>Informações de Entrega</h3>
                <button className="show-btn" onClick={() => setDisplayAddress(!displayAddress)}>
                    <FcExpand size={20} />
                </button>
            </header>
            {displayAddress ? (
                <div className="checkinfo-detail">
                    <div className="street-num">
                        <input name="rua" placeholder="Rua" onChange={onChangeInput} value={address.rua}/>
                        <input name="numero" placeholder="Numero" onChange={onChangeInput} value={address.numero}/>
                    </div>
                    <input name="bairro" placeholder="Bairro" onChange={onChangeInput} value={address.bairro}/>
                    <input name="cidade" placeholder="Cidade" onChange={onChangeInput} value={address.cidade}/>
                    <input name="cep" placeholder="Cep" onChange={onChangeInput} value={address.cep}/>
                    <input name="telefone" placeholder="Telefone Para Contato" onChange={onChangeInput} />
                    
                    <p>Total: R$ {props.total}</p>
                    <button className="finish-btn" onClick={onSubmitAddress}>Confirmar</button>
                </div>
            ) : (
                    <></>
                )}
        </div>
    );
}

export default CheckoutAddress;
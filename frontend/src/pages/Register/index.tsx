import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { cpfMask } from '../../common/MaskCpf';
import { BASE_URL } from '../../common/EndpoinURL';
import './styles.css';

import SimpleHeader from '../../components/simple-header';
import registerIcon from '../../assets/register.svg';


const Register: React.FC = () => {

    const { cpf } = useParams();

    const [clientCpf, setClientCpf] = useState(!cpf ? '' : cpf);
    const [newClient, setNewClient] = useState({
        nome: '',
        sobrenome: '',
        telefone: '',
    });

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setNewClient({
            ...newClient, [name]: value})
    }

    const onHandleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const { nome, sobrenome, telefone } = newClient;
        const data = {
            nome_cliente: nome,
            sobrenome,
            cpf: clientCpf,
            telefone
        };

        axios.post(`${BASE_URL}/cliente/create`,{
            ...data
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div id="register-main">
            <SimpleHeader />
            <div className="register-entry">
                <h2>Registre-se no Pasta Festival</h2>
                <p>Parece que você ainda não possui uma conta, registra-se agora</p>
                <img src={registerIcon} />
                <form onSubmit={onHandleSubmit}>
                    <input placeholder="CPF" 
                        id="cpf" 
                        name="cpf" 
                        type="text" 
                        onChange={event => setClientCpf(cpfMask(event.target.value))}
                        value={clientCpf}
                    />
                    <input placeholder="Nome" 
                        name="nome" 
                        type="text" 
                        onChange={event => onChangeValue(event)} />
                    <input placeholder="Sobrenome" 
                        name="sobrenome" 
                        type="text" 
                        onChange={event => onChangeValue(event)} />
                    <input placeholder="Telefone" 
                        name="telefone" 
                        type="text" 
                        onChange={event => onChangeValue(event)} />
                    <button>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
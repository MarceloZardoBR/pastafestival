import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { cpfMask } from '../../common/MaskCpf';
import './styles.css';

import LoginPic from '../../assets/login-pic.jpg';
import Cooking from '../../assets/cooking.png';
import { BASE_URL } from '../../common/EndpoinURL';

const Login: React.FC = () => {

  const [cpf, setCpf] = useState<string>();
  const history = useHistory();

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) =>{
    setCpf(cpfMask(event.target.value));
  }

  const onHandleAccess = (event: FormEvent) =>{
    event.preventDefault();
    if(cpf && cpf.trim()){
      axios.post(`${BASE_URL}/cliente/login`, {
        cpf: cpf
      }).then(res => {
        localStorage.setItem('user_cpf', res.data.cpf);
        history.push('/pastafestival/main');
      }).catch(err => {
        if(err.response.status === 404){
          history.push(`/cliente/register/${cpf}`);
        }
      })
    }
  }

  return (
    <div id="login-main">
      <header>
        <img src={LoginPic} />
      </header>
      <div className="middle-bar" />
      <div className="input-container">
        <p>Pasta Festival</p>
        <form onSubmit={onHandleAccess}>
          <fieldset>
            <div className="logo-container">
              <img src={Cooking} />
            </div>

            <div className="access-container">
              <input id="cpf-input" placeholder="CPF" onChange={onChangeInput} value={cpf}/>
                <span>
                  <button>Acessar</button>
                </span>
              </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Login;
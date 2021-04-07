import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../common/EndpoinURL';

import MainHeader from '../../components/main-header';
import PlatePreview from '../../components/plate-preview';
import './styles.css';

interface ICategories {
  id_categoria: number,
  nome: string,
  imagem: string
}

export interface IPratos {
  id_prato: number,
  nome: string,
  preco: number,
  imagem: string,
  id_categoria: number,
  quantidade: number
}

const Main: React.FC = () => {

  const [categories, setCategories] = useState<ICategories[]>([]);
  const [pratos, setPratos] = useState<IPratos[]>([]);
  const [selectedPlates, setSelectedPlates] = useState<IPratos[]>([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/cardapio/categorias`)
      .then(res => {
        setCategories(res.data);
      }).catch(err => {
        console.log(err);
      })

    axios.get(`${BASE_URL}/cardapio/pratos/`).then(res => {
      setPratos(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const onSelectCategory = (id: Number) => {  
    setSelectedPlates([...pratos.filter(prato => prato.id_categoria == id)]);
  }

  return (
    <div id="main-container">
      <MainHeader />
      <div className="separate-container">
        <div className="category-container">
          <ul>
            {categories.map((category: ICategories) => (
              <li key={category.id_categoria} onClick={() => onSelectCategory(category.id_categoria)}>
                <img src={`${BASE_URL}/uploads/${category.imagem}`} />
                <footer>
                  <p>{category.nome}</p>
                </footer>
              </li>
            ))}
          </ul>
        </div>
        <PlatePreview pratos={selectedPlates} />
      </div>
    </div>
  );
}

export default Main;
import axios from 'axios';
import { BASE_URL } from '../common/EndpoinURL';

export default (idPrato: number, cpf: string) => {

    axios.post(`${BASE_URL}/cliente/order/add`, {
        cpf: cpf,
        idPrato: idPrato
    }).then(res => console.log(res.data))
    .catch(err => {
        console.log(err);
    })

}
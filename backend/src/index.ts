import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'src', 'uploads')));

app.use(routes);

app.listen(3333, () => {
    console.log('Backend Is Running');
});
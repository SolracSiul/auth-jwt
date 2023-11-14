import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/Routes';
import { Request, Response } from 'express';

const app = express();

app.use(cors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  mongoose.connect('mongodb://localhost/new-jwt', {})
    .then(() => {
      console.log('Conectado ao mongo-docker');
    })
    .catch((error: any) => {
      console.log('Erro: ' + error);
    });
});

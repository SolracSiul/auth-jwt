import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import routes from './routes';
import { getIp } from 'get-my-own-ip';
import { Request, Response } from 'express';


const app = express();
const port = 3001;
let ad = getIp()

app.use(cors());
app.use(cors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://192.168.15.6:8081');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(routes);

mongoose.connect(`mongodb://${ad}/loja`, {})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida.');
    console.log('recuperei a porta', ad)
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB: ' + error);
  });
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import routes from './routes';
import { getIp } from 'get-my-own-ip';

const app = express();
const port = 3001;
let ad = getIp()

mongoose.connect(`mongodb://192.168.15.6/apipost`, {})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida.');
    console.log('recuperei a porta', ad)
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB: ' + error);
  });



app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
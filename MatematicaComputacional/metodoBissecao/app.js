import express from 'express';
import bodyParser from 'body-parser';
import { bissecao } from './metodoBissecao.js';

const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/metodo_bissecao', bissecao);

const PORT = 8081;
app.listen(PORT, () => {
    console.log("✅ Servidor rodando na porta:", PORT);
});

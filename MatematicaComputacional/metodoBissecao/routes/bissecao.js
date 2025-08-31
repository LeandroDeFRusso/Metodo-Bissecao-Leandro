import express from 'express'
import { calcularMetodoBissecao } from '../controllers/metodoBissecao.js'

const router = express.Router()

router.get('/', (req, res) =>{
    res.render('metodoBissecao/metodoBissecao')
});

router.get("/calcularMetodoBissecao", (req, res) =>{
    res.render('metodoBissecao/resultadosBissecao');
});

router.post("/calcularMetodoBissecao", calcularMetodoBissecao);

export default router;
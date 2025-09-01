import express from 'express'
import { calcularEliminacaoDeGauss } from '../controllers/eliminacaoDeGauss.js'

const router = express.Router()

router.get("/", (req, res) =>{
    res.render('eliminacaoDeGauss/eliminacaoDeGauss');
});

router.get("/calcularEliminacaoDeGauss", (req, res) => {
    res.render('eliminacaoDeGauss/resultadosGauss');
});

router.post("/calcularEliminacaoDeGauss", calcularEliminacaoDeGauss);


export default router;
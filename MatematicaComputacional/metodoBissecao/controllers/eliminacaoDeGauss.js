export function calcularEliminacaoDeGauss(req, res) {
    try {
        let { n, matrizF, termos } = req.body;
        n = parseInt(n);
        matrizF = matrizF.map(linha => linha.map(Number));
        termos = termos.map(Number);
        let A = matrizF.map((linha, i) => [...linha, termos[i]]);

        let etapas = [];
        let multiplicadores = [];

        for (let k = 0; k < n - 1; k++) {
            if (A[k][k] === 0) {
                let maxLinha = k;
                for (let i = k + 1; i < n; i++) {
                    if (Math.abs(A[i][k]) > Math.abs(A[maxLinha][k])) {
                        maxLinha = i;
                    }
                }
                if (A[maxLinha][k] === 0) {
                    throw new Error(`Não foi possível encontrar pivô na coluna ${k + 1}. O sistema pode ser indeterminado ou impossível.`);
                }
                [A[k], A[maxLinha]] = [A[maxLinha], A[k]];
            }
            for (let i = k + 1; i < n; i++) {
                let m = A[i][k] / A[k][k];
                multiplicadores.push({ linha: i + 1, coluna: k + 1, valor: m });
                for (let j = k; j <= n; j++) {
                    A[i][j] -= m * A[k][j];
                }
            }
            etapas.push(JSON.parse(JSON.stringify(A)));
        }
        let x = new Array(n);
        for (let i = n - 1; i >= 0; i--) {
            let soma = 0;
            for (let j = i + 1; j < n; j++) {
                soma += A[i][j] * x[j];
            }
            if (A[i][i] === 0) {
                throw new Error(`Divisão por zero na linha ${i + 1}.`);
            }
            x[i] = (A[i][n] - soma) / A[i][i];
        }
        res.render("eliminacaoDeGauss/resultadosGauss", {
            n, matrizOriginal: matrizF, termosOriginais: termos, etapas, solucao: x, multiplicadores, quantidadeMultiplicadores: multiplicadores.length
        });
    } catch (error) {
        res.render("eliminacaoDeGauss/resultadosGauss", {
            erro: "Erro ao calcular, verifique os dados e tente novamente!: " + error.message
        });
    }
}

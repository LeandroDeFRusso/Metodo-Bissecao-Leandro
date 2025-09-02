function validarFuncao(funcaoEmString) {
    try {
        funcaoEmString = funcaoEmString.replace(/([a-zA-Z0-9]+)\^([0-9]+)/g, "Math.pow($1,$2)");
        return new Function("x", `return ${funcaoEmString};`);
    } catch (err) {
        throw new Error("Função Inválida");
    }
}

function encontrarIntervalos(valor) {
    const intervalos = [];

    for (let i = -1000; i < 1000; i++) {
        let x1 = i;
        let x2 = i + 1;
        let f1 = valor(x1);
        let f2 = valor(x2);

        if (f1 * f2 < 0) {
            intervalos.push([x1, x2]);
        }
    }
    return intervalos;
}

function calculaBissecao(valor, a, b, parada) {
    let iteracoes = [];
    let valorA = valor(a);
    let valorB = valor(b);

    if (valorA * valorB >= 0) {
        return { erro: "Esse intervalo é inválido, sem mudança de sinal" };
    }
    let buscaMeio;

    while ((b - a) / 2 > parada) {
        buscaMeio = (a + b) / 2;
        let meio = valor(buscaMeio);

        iteracoes.push({ a, b, buscaMeio, meio, fA: valorA, fB: valorB, fM: meio });

        if (meio === 0) break;
        else if (valorA * meio < 0) {
            b = buscaMeio;
            valorB = meio;
        } else {
            a = buscaMeio;
            valorA = meio;
        }
    }
    return { raiz: buscaMeio, iteracoes };
}

export function calcularMetodoBissecao(req, res) {
    try {
        const { funcao, parada } = req.body;
        const eps = parseFloat(parada);
        const f = validarFuncao(funcao);
        const intervalos = encontrarIntervalos(f)

        if (intervalos.length < 1) {
            return res.render("metodoBissecao/resultadosBissecao", { erro: "Nenhum intervalo foi encontrado dentro do intervalos" });
        }
        const resultados = intervalos.map(([a, b]) => {
            const resultado = calculaBissecao(f, a, b, eps);
            return { intervalo: [a, b], ...resultado };
        });

        res.render("metodoBissecao/resultadosBissecao", { funcao, parada: eps, intervalos, resultados });
    } catch (error) {
        res.render("metodoBissecao/resultadosBissecao", { erro: "Houve um erro ao calcular:" + error.message });
    }
}
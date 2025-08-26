function bissecao(func, a, b, tol) {
    let fa = func(a);
    let fb = func(b);

    if (fa * fb >= 0) {
        return null;
    }

    let iter = 0;
    let c, fc;

    while ((b - a) / 2 > tol) {
        c = (a + b) / 2;
        fc = func(c);

        if (fc === 0) {
            break;
        }

        if (fa * fc < 0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }

        iter++;
        if (iter > 1000) break;
    }

    return {
        raiz: (a + b) / 2,
        iteracoes: iter
    };
}

bissecao.post("/metodo_bissecao", (req, res) => {
    try {
        const { expressao, tolerancia } = req.body;
        if (!expressao || tolerancia === undefined) {
            return res.status(400).json({ erro: "Informe expressao e tolerancia." });
        }
        let func;
        try {
            func = new Function("x", "return " + expressao);
            func(0);
        } catch (e) {
            return res.status(400).json({ erro: "Expressão inválida." });
        }
        const intervalos = [];
        for (let i = -1000; i < 1000; i++) {
            const x1 = i;
            const x2 = i + 1;
            if (func(x1) * func(x2) < 0) {
                intervalos.push([x1, x2]);
                if (intervalos.length === 2) break;
            }
        }
        if (intervalos.length === 0) {
            return res.json({ mensagem: "Nenhum intervalo com raiz encontrado." });
        }
        const resultados = intervalos.map(([a, b]) => {
            const resultado = bissecao(func, a, b, parseFloat(tolerancia));
            return { intervalo: [a, b], ...resultado };
        });

        res.json({ intervalos, resultados });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});


export { bissecao };
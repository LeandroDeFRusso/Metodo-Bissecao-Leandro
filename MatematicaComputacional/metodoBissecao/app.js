import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import methodOverrride from 'method-override';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import index from './routes/index.js'
import bissecao from './routes/bissecao.js'
import gauss from './routes/gauss.js'
import hbs from 'hbs';

const app = express();

app.use(methodOverrride('_method'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        inc: function (value) {
            return parseInt(value) + 1;
        }
    }
}))

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/', index);
app.use('/metodo-bissecao', bissecao);
app.use('/eliminacao-de-gauss', gauss);

const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta:", PORT);
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5432;
const repository = require('./repository')

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


app.listen(port, () => {
    console.log(`Servidor rodando na porta de conexão ${port}.`)
})

app.get('/', (request, response) => {
    response.json({ aplicacao: 'CRUD EDUC' })
})

app.get('/usuarios', repository.getUsuarios);
app.get('/usuario/:id', repository.getUsuarioById);
app.post('/usuarios', repository.createUsuario);
app.put('/usuario/:id', repository.updateUsuario);
app.delete('/usuario/:id', repository.deleteUsuario);
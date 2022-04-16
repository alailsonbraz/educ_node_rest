const { Pool } = require('pg');

const pool = new Pool({
    /* user: 'flfdnwmrusnnyb',
    host: 'ec2-54-155-208-5.eu-west-1.compute.amazonaws.com',
    database: 'dco68ge81p137o',
    password: '489d08c80924f16c8f8339d896b731cdc15fd572ad60c7883dfc9d4b4f97f496',
    port: 5432, */
    connectionString: 'postgres://flfdnwmrusnnyb:489d08c80924f16c8f8339d896b731cdc15fd572ad60c7883dfc9d4b4f97f496@ec2-54-155-208-5.eu-west-1.compute.amazonaws.com:5432/dco68ge81p137o',
    ssl: {
        rejectUnauthorized: false
    }
});

const getUsuarios = (request, response) => {

    pool.query('SELECT * FROM usuario ORDER BY nome', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsuarioById = (request, response) => {

    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUsuario = (request, response) => {

    const { nome, email, data_nascimento, genero, password, usuario_tipo } = request.body;

    pool.query('INSERT INTO usuario (nome, email, data_nascimento, genero, password, usuario_tipo) VALUES ($1, $2, $3, $4, $5, $6)', [nome, email, data_nascimento, genero, password, usuario_tipo], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json('Usuário criado com sucesso')
    })
}

const updateUsuario = (request, response) => {

    const id = parseInt(request.params.id);
    const { nome, email, data_nascimento, genero, password, usuario_tipo, id_curso } = request.body;

    pool.query(
        'UPDATE usuario SET nome = $1, email = $2, data_nascimento = $3, genero = $4, password = $5, usuario_tipo = $6, id_curso = $7 WHERE id_usuario = $8', [nome, email, data_nascimento, genero, password, usuario_tipo, id_curso, id], (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send('Usuario ' + id + ' atualizado com sucesso.');
        })
}

const deleteUsuario = (request, response) => {

    const id = parseInt(request.params.id);

    pool.query(
        'DELETE FROM usuario WHERE id_usuario = $1', [id], (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send('Usuario ' + id + ' removido com sucesso.');
        })
}


module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
}
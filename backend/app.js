const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')


//Database
/* Abaixo apenas uma associação da API de Promise do Node,
visto que a API do mongo está depreciada */
mongoose.Promise = global.Promise

// Agora sim a conexão
mongoose.connect('mongodb://db/mydb') //Atente para o nome 'db', que será um serviço no compose

/* // Teste de conexão com uma 'Promise'
server.get('/', (req, res, next) => res.send('<br><br><h1>Backend</h1>')) */

//Middlewares
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

//ODM - Mapeamento Objeto/Cliente
const Client = restful.model('Client', {
    name: { type: String, required: true }
})

//Rest API
Client.methods(['get', 'post', 'put', 'delete']) //Array de métodos
Client.updateOptions({ new: true, runValidators: true }) /* Essa linha é apenas referência, 
para caso haja necessidade de validação das entradas ou tratamentos de erros */

// Routes
Client.register(server, '/clients')

//Inicializando o Server
server.listen(3000)

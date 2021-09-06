const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose

//Database
/* Abaixo apenas uma associação da API de Promise do Node,
visto que a API do mongo está depreciada */
mongoose.Promise = global.Promise

// Agora sim a conexão
mongoose.connect('mongodb://db/mydb') //Atente para o nome 'db', que será um serviço no compose

// Teste 
server.get('/', (req, res, next) => res.send('Backend'))

//Inicializando o Server
server.listen(3000)

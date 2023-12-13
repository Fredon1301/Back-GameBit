'use strict'

const mongoose = require('mongoose')
const cors = require('cors');   
const fs = require('fs')
const http = require('http')
const https = require('https')
const multer = require('multer');
const path = require('path');
require('dotenv').config()
require('socket.io')


mongoose.connect('mongodb://127.0.0.1:27017/Back-GamesBit')

const express = require('express')


const app = express()

const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server, {})

io.on('connection', socket => {
  socket.on('chat', (msg) => {
    io.emit('chat', msg)
  })
  socket.on('disconnect', (msg) => {
    console.log('Dispositivo desconectado')
  })
})

server.listen(3333, () => {
  console.log(`O servidor está em execução na porta 3333`);
});

const storage = multer.diskStorage({
   destination: './profile',
   filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
   },
 });
 
 const upload = multer({ storage });

 
const saveImageToDatabase = async (imagePath) => {
   try {
     const imageBuffer = fs.readFileSync(imagePath);
     const contentType = 'image/jpeg'; 
 
     const newProfile = new Profile({
       profileImage: {
         data: imageBuffer,
         contentType: contentType,
       },
     });
 
     await newProfile.save();
     console.log('Imagem salva com sucesso no banco de dados.');
   } catch (error) {
     console.error('Erro ao salvar imagem no banco de dados:', error);
   }
 };

const middlewareAuth = require('./src/middlewareAuth')
const userRouter = require('./src/router/userRouter')

const bookRouter = require('./src/router/productRouter')
const cartRouter = require('./src/router/cartRouter')
const jwtService = require('jsonwebtoken');


app.use(cors());
app.use(express.json())
app.use(middlewareAuth)
app.use(userRouter)
app.use(cartRouter)
app.use(bookRouter)




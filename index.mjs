// * Importacion de librerias
import express from 'express'
import { conexion } from './src/config/conexion.mjs' // Importacion de la variable conexion en el fichero conexion.mjs
import 'dotenv/config'

// * Creacion del servidor con express 
const app = express()
const PORT = process.env.PORT || 9896



// ? Creamos una URL para saber si la conexion es correcta 
app.get('/', async (req,res)=>{
    res.send('Servidor Funcionando 🙋‍♂️ ')
})



// * Asignamos el puerto y un mensaje 
app.listen(PORT,()=>{
    console.log(`Apliacacion corriendo en el puerto : ${PORT}`)
})
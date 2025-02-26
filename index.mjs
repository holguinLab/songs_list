//#region Importacion de librerias
import express from 'express'
import './src/config/conexion.mjs' // Importacion de la variable conexion en el fichero conexion.mjs
import 'dotenv/config' // Para configurar el dotenv .env
import { Songs } from './src/models/songs.mjs' // Modelo Song 
import mongoose from 'mongoose'
//#endregion


// * Creacion del servidor con express 
const app = express()
const PORT = process.env.PORT || 9896 // si no hay puerto pongo el 9896

// ! Esto es para hacer POST (investigarr)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// * Creamos una URL para saber si la conexion es correcta 
app.get('/', async (req,res)=>{
    res.send('Servidor Funcionando 🙋‍♂️ ')
})


//#region CRUD 
// * CREATE
// Añadir una cancion
app.post('/addSong',async(req,res)=>{
    const newSong = new Songs({
        "codigo"    :req.body.codigo,
        "titulo"    :req.body.titulo,
        "artista"   :req.body.artista,
        "duracion"  :req.body.duracion,
        "estrellas" :req.body.estrellas,
        "genero"    :req.body.genero,
    })
    await newSong.save()
    res.status(201).json({mensaje : 'Cancion Agregada correctamente ' , song : newSong})
})


// * READ 
// Obtener TODOS los datos  
app.get('/getAllSong',async(req,res)=>{
    res.json(await Songs.find())
})

// Obtener SOLO un dato con el codigo 
app.get('/getOneSong/:id',async(req,res)=>{
    res.json(await Songs.findOne({'codigo':req.params.id})) // !Busca un documento donde el campo 'codigo' tenga el valor de req.params.id.///// req.params.id es el valor del parámetro de la URL que se pasa en la solicitud HTTP. http://localhost:3000/cancion/'12345' <---------
})


// * UPDATE 
// Actualizar una cancion por codigo
app.put('/updateSong/:id',async (req,res)=>{
    const {titulo,artista,duracion,estrellas,genero} = req.body // obtiene los valores del body 
    const updateSong=await Songs.findOneAndUpdate(
        {'codigo':req.params.id}, // ! 🔥 Busca un documento donde el campo 'codigo' tenga el valor de req.params.id.///// req.params.id es el valor del parámetro de la URL que se pasa en la solicitud HTTP. http://localhost:3000/cancion/'12345' <---------de req.params.id.
        {titulo:titulo,artista:artista,duracion:duracion,estrellas:estrellas,genero:genero}, // remplaza los valores del body por los de la bd
        {new:true} // Retorna el documento actualizado true 
    )
//! 🔥 IMPORTANTE: Siempre devolver una respuesta en la solicitud HTTP      
    res.json({Mensaje : ' Cancion Actualizada Correctamente ', song : updateSong})
})


// * DELATE
// Eliminar una cancion por codigo
app.delete('/delSong/:id',async(req,res)=>{
    const del = await Songs.findOneAndDelete({'codigo':req.params.id},{new:true})
    res.send('Elimiando Correctamente')
})
//#endregion


// * Asignamos el puerto y un mensaje 
app.listen(PORT,()=>{
    console.log(`Apliacacion corriendo en el puerto : ${PORT}`)
})
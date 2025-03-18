import { Songs } from "../models/songs.mjs";


// Ruta Para listar todas las canciones
const  listSongs = async(req,res)=>{
    const songs = await Songs.find() // Variable que guarda todas las canciones de la base de datos en el modelo Songs
    res.render('base',{titulo:'SONGS',content:'songs/listSongs',songs}) // Se Renderiza la vista con las variables  titulo y songs
}


// Ruta Home ( laning page)
const home = async (req,res)=>res.render('base',{titulo:'HOME',content:'home'})

// Mostrar Fomulario
const reqFormSongs = async(req,res)=>{
    res.render('base',{titulo:'Fomulario Canciones',content:'songs/formSongs',Mensaje:''})
}

// Obtiene Datos de la peticion por medio del body 
const postFormSong = async(req,res)=>{
    const newSong = new Songs({
        "codigo"    :req.body.codigo,
        "titulo"    :req.body.titulo,
        "artista"   :req.body.artista,
        "duracion"  :req.body.duracion,
        "estrellas" :req.body.estrellas,
        "genero"    :req.body.genero,
        "likes"     :req.body.likes,
    })
    await newSong.save()
    if (req.headers.accept && req.headers.accept.includes("application/json")){
        return res.status(401).json({Mensaje:'Cancion Agregada Correctamente'})
    }else{
        res.render('base',{titulo:'Fomulario Canciones',content:'songs/formSongs',Mensaje:'Cancion agregada correctamente'})
    }
}


export default {listSongs,home,reqFormSongs,postFormSong}

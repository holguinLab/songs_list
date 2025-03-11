import { Songs } from "../models/songs.mjs";


// Ruta Para listar todas las canciones
const  listSongs = async(req,res)=>{
    const songs = await Songs.find() // Variable que guarda todas las canciones de la base de datos en el modelo Songs
    res.render('base',{titulo:'SONGS',content:'songs/listSongs',songs}) // Se Renderiza la vista con las variables  titulo y songs
}

// Ruta Home ( laning page)
const home = async (req,res)=>res.render('base',{titulo:'HOME',content:'home'})

export default {listSongs,home}

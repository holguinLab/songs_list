import { Usuarios } from "../models/usuarios.mjs";

const  listUsuario = async(req,res)=>{
    const usuarios = await Usuarios.find() // Variable que guarda todas las canciones de la base de datos en el modelo Songs
    res.render('base',{titulo:'Usuarios',content:'usuarios/listUsuarios',usuarios}) // Se Renderiza la vista con las variables  titulo y songs
}

export default {listUsuario}
import { Vendedores } from "../models/vendedores.mjs";

const  listVendedores = async(req,res)=>{
    const vendedores = await Vendedores.find() // Variable que guarda todas las canciones de la base de datos en el modelo Songs
    res.render('base',{titulo:'Vendedores',content:'vendedores/listVendedores',vendedores}) // Se Renderiza la vista con las variables  titulo y songs
}

export default {listVendedores}
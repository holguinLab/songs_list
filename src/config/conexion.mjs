//  -------------->  conexion a mongo DB <------------------

// * Importamos Libreria 
import mongoose from 'mongoose'
import 'dotenv/config'



// ? Exportamos con ESM (ECMAScript Module)
export const conexion =  mongoose.connect(`mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@clasenodeactualizada.ltuda.mongodb.net/${process.env.BD}`)
.then(()=>console.log('Conexion A MongoDB !Exitosa!'))
.catch((error)=>console.log(`Conexion A Mongo Fallida ${error}`))


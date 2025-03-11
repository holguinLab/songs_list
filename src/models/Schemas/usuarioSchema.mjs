import mongoose from "mongoose";
import validator from 'validator'


export const usarioSchema = new mongoose.Schema({
    email : {
        type:String , 
        required:[true,'Campo Requerido'],
        unique:true,
        validate:[validator.isEmail,'Correo Invalido']
    },
    password : {type:String , required:[true,'Campo Requerido'],minlength:7},
    rol :{
        type:String , 
        required:[true,'Campo Requerido'],
        enum : ["cliente", "vendedor", "gerente", "invitado"],
    },
    refVendedor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendedores", required: true } 
},{versionKey:false}) 


/* '(correo, contraseña, rol, refVendedor)
El correo debera ser validado como correo
la contraseña debe ser minimo de 7 caracteres
el rol deberá estar entre [cliente, vendedor, gerente, invitado]
la refVendedor es el objectId del vendedor' */
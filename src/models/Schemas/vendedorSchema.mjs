import mongoose from "mongoose";

export const vendedorSchema = new mongoose.Schema({
    nombre : {type:String , required:[true,'Campo Requerido'],minlength:5 },
    documento : {type:String , required:[true,'Campo Requerido '],minlength: 7, maxlength: 10 },
    ventasDespachadas :{type:String , required:[true,'Campo Requerido'] ,min:0 },
},{versionKey:false})


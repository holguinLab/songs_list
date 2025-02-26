import mongoose, { version } from "mongoose"

export const songSchema=new mongoose.Schema({
    codigo:{type:Number,required:true},
    titulo:{type:String,required:true},
    artista   :{type:String,required:true},
    duracion  :{type:Number,required:true},
    estrellas :{type:Number,required:true}, 
    genero    :{type:String,required:true},
},{versionKey : false})

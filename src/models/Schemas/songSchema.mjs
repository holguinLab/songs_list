import mongoose from "mongoose"

export const songSchema=new mongoose.Schema({
    codigo:{type:Number,required:    [true, 'Campo requerido , unico y mayor a 0 '],unique:true,min:1},
    titulo:{type:String,required:    [true, 'Campo requerido']},
    artista   :{type:String,required:[true, 'Campo requerido']},
    duracion  :{type:Number,required:[true, 'Campo requerido']},
    estrellas :{type:Number,required:[true, 'Campo requerido']}, 
    genero    :{type:String,required:[true, 'Campo requerido']},
    likes     :{type:Number,required:[true, 'Campo requerido']},
},{versionKey : false})

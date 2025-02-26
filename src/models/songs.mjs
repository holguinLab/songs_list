import mongoose from "mongoose";
import { songSchema } from "./Schemas/songSchema.mjs";

// ? Creacion del modelo Songs segun el esquema de arriba 

export const Songs = mongoose.model('Songs',songSchema)
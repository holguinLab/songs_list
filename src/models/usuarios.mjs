import mongoose from "mongoose";
import { usarioSchema } from "./Schemas/usuarioSchema.mjs";

export const Usuarios = mongoose.model('Usuarios',usarioSchema)


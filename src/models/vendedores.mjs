import { vendedorSchema } from "./Schemas/vendedorSchema.mjs";
import mongoose from "mongoose";

export const Vendedores = mongoose.model('Vendedores',vendedorSchema)
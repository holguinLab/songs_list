import { Usuarios } from "../models/usuarios.mjs";
import { Vendedores } from "../models/vendedores.mjs";

const registerVendedor = async (req, res) => {
    try {
        const { nombre, documento, ventasDespachadas, email, password, rol } = req.body;

        // Validar datos del vendedor
        if (!nombre || nombre.length < 5) return res.status(400).json({ error: "El nombre debe tener al menos 5 caracteres." });
        if (!documento || documento.length < 7 || documento.length > 10) return res.status(400).json({ error: "El documento debe tener entre 7 y 10 caracteres." });
        if (ventasDespachadas < 0) return res.status(400).json({ error: "Las ventas despachadas no pueden ser negativas." });

        // Crear vendedor en MongoDB
        const newVendedor = new Vendedores({ nombre, documento, ventasDespachadas });
        const savedVendedor = await newVendedor.save();

        //------------------------------------------------------------------//



        // Validar datos del usuario
        if (!email || !password || !rol) return res.status(400).json({ error: "Correo, contraseña y rol son obligatorios." });
        if (password.length < 7) return res.status(400).json({ error: "La contraseña debe tener al menos 7 caracteres." });

        // Crear usuario en MongoDB con referencia al vendedor
        const newUser = new Usuarios({ email, password, rol, refVendedor: savedVendedor._id });
        await newUser.save();

        res.status(201).json({ message: "Vendedor y usuario creados con éxito", vendedorId: savedVendedor._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export default {registerVendedor}
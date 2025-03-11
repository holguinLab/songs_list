import express from 'express'
import songController from '../src/controller/songController.mjs'
import vendedorController from '../src/controller/vendedorController.mjs'
import usuarioController from '../src/controller/usuarioController.mjs'
import vendedoresController from '../src/controller/vendedoresController.mjs'

export const router = express.Router()


// Rutas de Canciones 
router.get('/',songController.home)
router.get('/songs',songController.listSongs)


// Rutas de Usuarios
router.get('/usuarios',usuarioController.listUsuario)



//Rutas de Vendedores 
router.get('/vendedores',vendedoresController.listVendedores)
router.post('/registerVendedor',vendedorController.registerVendedor)
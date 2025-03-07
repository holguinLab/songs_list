//#region Importacion de librerias
import express from 'express' // Crear Servidores
import './src/config/conexion.mjs' // Importacion de la variable conexion en el fichero conexion.mjs
import 'dotenv/config' // Para configurar el dotenv .env
import { Songs } from './src/models/songs.mjs' // Modelo Song 
import mongoose from 'mongoose' // Importamos mongoose para hacer POST
import path from 'path' // Libreria para EJS generar Rutas renderizadas 
import ExcelJS from 'exceljs'; // Exportar datos a Excel 
import PDFDocument from "pdfkit"; // Exportar PDF
import nodemailer from "nodemailer" // Enviar correo desde node
//#endregion



// * Creacion del servidor con express 
const app = express()
const PORT = process.env.PORT || 9896 // si no hay puerto pongo el 9896


// Requerido para usar plantillas  EJS 
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));


// Requerido para hacer POST 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//#region CRUD 
// * CREATE
// Añadir una cancion
app.post('/addSong',async(req,res)=>{
    const newSong = new Songs({
        "codigo"    :req.body.codigo,
        "titulo"    :req.body.titulo,
        "artista"   :req.body.artista,
        "duracion"  :req.body.duracion,
        "estrellas" :req.body.estrellas,
        "genero"    :req.body.genero,
        "likes"     :req.body.likes,
    })
    await newSong.save()
    res.status(201).json({mensaje : 'Cancion Agregada correctamente ' , song : newSong})
})


// * READ 
// Obtener TODOS los datos  
app.get('/getAllSong',async(req,res)=>{
    res.json(await Songs.find())
})

// Obtener SOLO un dato con el codigo 
app.get('/getOneSong/:id',async(req,res)=>{
    res.json(await Songs.findOne({'codigo':req.params.id})) // !Busca un documento donde el campo 'codigo' tenga el valor de req.params.id.///// req.params.id es el valor del parámetro de la URL que se pasa en la solicitud HTTP. http://localhost:3000/cancion/'12345' <---------
})


// * UPDATE 
// Actualizar una cancion por codigo
app.put('/updateSong/:id',async (req,res)=>{
    const {titulo,artista,duracion,estrellas,genero,likes} = req.body // obtiene los valores del body 
    const updateSong=await Songs.findOneAndUpdate(
        {'codigo':req.params.id}, // ! 🔥 Busca un documento donde el campo 'codigo' tenga el valor de req.params.id.///// req.params.id es el valor del parámetro de la URL que se pasa en la solicitud HTTP. http://localhost:3000/cancion/'12345' <---------de req.params.id.
        {titulo:titulo,artista:artista,duracion:duracion,estrellas:estrellas,genero:genero,likes:likes}, // remplaza los valores del body por los de la bd
        {new:true} // Retorna el documento actualizado true 
    )
//! 🔥 IMPORTANTE: Siempre devolver una respuesta en la solicitud HTTP      
    res.json({Mensaje : ' Cancion Actualizada Correctamente ', song : updateSong})
})


// * DELATE
// Eliminar una cancion por codigo
app.delete('/delSong/:id',async(req,res)=>{
    const del = await Songs.findOneAndDelete({'codigo':req.params.id},{new:true})
    res.send('Elimiando Correctamente')
})
//#endregion

//#region EJS

// * RUTA : HOME
app.get('/', async (req,res)=>res.render('base',{titulo:'HOME',content:'home'}))

// * RUTA : songs (listar todas las canciones)
app.get('/songs',async(req,res)=>{
    const songs = await Songs.find()
    res.render('base',{titulo:'SONGS',content:'songs/listSongs',songs})
})

//#endregion 

//#region EXPORTAR A EXCEL

// Ruta para exportar canciones   a Excel
app.get('/exportSongs', async (req, res) => {
    try {
        const songs = await Songs.find(); // Obtiene los datos de la BD

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Songs');

        // Definir columnas
        worksheet.columns = [
            { header: 'Código', key: 'codigo', width: 10 },
            { header: 'Título', key: 'titulo', width: 25 },
            { header: 'Artista', key: 'artista', width: 20 },
            { header: 'Duración', key: 'duracion', width: 10 },
            { header: 'Estrellas', key: 'estrellas', width: 25 },
            { header: 'Likes', key: 'likes', width: 25 },
            { header: 'Género', key: 'genero', width: 15 }
        ];

        // Recorrer los datos de MongoDB y agregarlos al Excel
        songs.forEach(song => {
            worksheet.addRow({
                codigo: song.codigo,
                titulo: song.titulo,
                artista: song.artista,
                duracion: song.duracion,
                estrellas: song.estrellas,
                likes: song.likes,
                genero: song.genero
            });
        });

        // Configurar la respuesta HTTP para descargar el archivo
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=songs.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error al generar el archivo:', error);
        res.status(500).send('Error al generar el archivo Excel');
    }
});
//#endregion

//#region  EXPORTAR A PDF

app.get('/exportPdf', async (req, res) => {
    const doc = new PDFDocument({ font: 'Helvetica' });
    
    // Configurar la respuesta HTTP para descargar el PDF
    res.setHeader('Content-Disposition', 'attachment; filename="Reporte_Canciones.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    // Conectar el PDF al flujo de respuesta
    doc.pipe(res);

    // Obtener canciones desde la base de datos
    const songs = await Songs.find();  

    // 📌 Título del PDF
    doc.font('Helvetica').fontSize(20).text('Reporte de Canciones', { align: 'center' });
    doc.moveDown();

    // 📌 Agregar canciones al PDF
    songs.forEach(song => {
        doc.fontSize(14).text(` ${song.titulo} - ${song.artista} (${song.duracion}) - ${song.genero} - ${song.estrellas} - ${song.likes}`);
        doc.moveDown();
    });

    // Finalizar el PDF y asegurarse de que se envía
    doc.end();
});

//#endregion

//#region ENVIAR CORREO

const transporter = nodemailer.createTransport({
    service: "gmail",
    
    auth: {
            user: process.env.EMAIL,
            pass: process.env.PEMAIL,
        }
    });



app.post("/sendEmail", async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: req.body.destinatario,
            subject: req.body.asunto,
            text: req.body.cuerpo
        });
        res.status(200).json({ mensaje: "Correo enviado con éxito" });

    } catch (error) {
        res.status(500).json({ error: `${error}` });
        }
    });
//#endregion 


// * Asignamos el puerto y un mensaje 
app.listen(PORT,()=>{
    console.log(`Apliacacion corriendo en el puerto : ${PORT}`)
})
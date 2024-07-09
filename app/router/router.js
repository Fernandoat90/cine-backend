const express=require('express');

const router=express.Router();

const usuControl =  require('../controller/usuController');

const usuLog= require('../controller/usuLog');

const PelisControl = require('../controller/pelisController');

const EntradasControl = require('../controller/entradasController');

const completeSelect=require('../controller/completeSelect');


//rutas usuario localhost:3000/sigin
router.get('/sigin',usuControl.getAllUsu);
router.get('/sigin/:id',usuControl.getUsuById);
router.post('/sigin',usuControl.createNewUsu );
router.put('/sigin/:id',usuControl.updateUsu);
router.delete('/sigin/:id',usuControl.deleteUsu);

//autenticacion de loguin
router.post('/login', usuLog.getUsuLog);

//rutas pelicula localhost:3000/pelis/pelis
router.get('/pelis/todas',PelisControl.getPeliculas);
router.get('/inner/:id',PelisControl.getInnerPeliculas);
router.get('/pelis/:id',PelisControl.getPeliculasById);
router.post('/pelis',PelisControl.CreatePeliculas);
router.put('/pelis/:id',PelisControl.updatePeliculas);
router.delete('/pelis/:id',PelisControl.deletePeliculas);

//rutas entradas localhost:3000/entradas
router.get('/entradas/compras',EntradasControl.getAllEntradas);
router.get('/entradas/:id',EntradasControl.getEntradaById);
router.post('/entradas',EntradasControl.CreateEntradas);
router.put('/entradas/:id',EntradasControl.uploadEntradas);
router.delete('/entradas/:id',EntradasControl.deleteEntradas);

router.get('/horas/:id',completeSelect.gethorarios);
router.get('/formato/:pelis,:hora',completeSelect.getFormato);
router.get('/asiento/:pelis,:hora,:form',completeSelect.getAsiento);



module.exports= router;
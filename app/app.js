const express = require('express');
const path = require('path');
const cors=require('cors');
const router = require('./router/router');
const bodyParser=require('body-parser');
const app = express();
const Port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos y configuración de vistas
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rutas
app.use('/', router);

// Rutas para enviar archivos HTML al cliente
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './pages/index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, './pages/sigin.html')));
app.get('/peliculas',(req,res)=>res.sendFile(path.join(__dirname,'./pages/peliculas.html')));

// Iniciar servidor
app.listen(Port, () => {
  console.log('¡El servidor está corriendo correctamente!');
});


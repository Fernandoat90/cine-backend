const mysql= require('mysql2')

const conection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cine1'
})

conection.connect((err)=>{
    if(err){
        console.log('Error en conectar la Base de datos',err);
        return;
    }
    console.log('connected to database')
})

module.exports = conection;
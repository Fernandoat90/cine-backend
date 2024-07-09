const db=require('../db/db_cine');

const getAllEntradas= (req,res) =>{
    const sql='SELECT entradas.ent_id,usuarios.nombre,usuarios.apellido,usuarios.dni,pelicula.titulo,formato.tipo,entradas.fecha,entradas.monto,horario.hora_peli AS Funcion_hora FROM entradas INNER JOIN usuarios ON entradas.id_usu=usuarios.id_usu INNER JOIN pelicula ON entradas.peli_id=pelicula.peli_id INNER JOIN formato ON pelicula.formato_id = formato.formato_id INNER JOIN horario ON pelicula.hora_id=horario.hora_id';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result); 
    })
}

const getEntradaById=(req,res) =>{
    const {id} =req.params;
    const sql='SELECT * FROM entradas WHERE ent_id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.json(result);
 }
)}

const CreateEntradas= (req,res) =>{
    const {peli_id,hora_id,formato_id,asi_id,dni,monto} =req.body;
    
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const day = `${anio}-${mes}-${dia}`;

    const hour= new Date().toLocaleTimeString();
    const sql='INSERT INTO entradas(id_usu,sala_id,asi_id,fecha,hora,monto) VALUES (?,?,?,?,?,?)';
    db.query(sql,[peli_id,hora_id,formato_id,asi_id,dni,monto],(err,result)=>{
        if(err) throw err;
        res.json('Entrada Reservada exitosamente');
    })
}

const uploadEntradas= (req,res) =>{
    const {id} =req.params;
    const {usu_id,peli_id,asi_id,fecha,hora,monto} = req.body;
    const sql = 'UPDATE entradas SET usu_id=?,peli_id=?,asi_id=?,fecha=?,hora=?,monto=? WHERE ent_id=?';
    db.query(sql,[usu_id,peli_id,asi_id,fecha,hora,monto,id],(err,result)=>{
        if(err) throw err;
        res.json({mensage:'Entrada actualizada exitosamente'});
    })
}

const deleteEntradas= (req,res) =>{
    const {id} = req.params;
    const sql = 'DELETE FROM entrada WHERE ent_id= ?';
    db.query(sql,[id],(err,result) =>{
        if(err) throw err;
        res.json('Entrada eliminada');
    })
}

module.exports={
    getAllEntradas,
    getEntradaById,
    CreateEntradas,
    uploadEntradas,
    deleteEntradas
}
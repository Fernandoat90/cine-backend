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
    const sql = 'UPDATE entradas SET usu_id=?,sala_id=?,asi_id=?,fecha=?,hora=?,monto=? WHERE ent_id=?';
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


const FrontCarga = async (req, res) => {
    const { pelicula,horario,formato,asiento,dni,monto } = req.body;

    try {
        const salaQuery = 'SELECT sala_id FROM salas WHERE peli_id=? AND hora_id=? AND formato_id=?';
        const [salaResult] = await db.promise().query(salaQuery, [pelicula, horario, formato]);
        
        if (!salaResult || !salaResult.length) {
            throw new Error('No se encontró sala para los parámetros dados');
        }

        const sala_id = salaResult[0].sala_id;

        // Obtener id_usu
        const usuQuery = 'SELECT id_usu FROM usuarios WHERE dni=?';
        const [usuResult] = await db.promise().query(usuQuery, [dni]);
        
        if (!usuResult || !usuResult.length) {
            throw new Error('No se encontró usuario con el DNI proporcionado');
        }

        const id_usu = usuResult[0].id_usu;

        // Actualizar asiento
        const updateAsientoQuery = 'UPDATE asiento SET disponible=0 WHERE asi_id=?';
        await db.promise().query(updateAsientoQuery, [asiento]);

        // Insertar entrada
        const fecha = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
        const hora = new Date().toLocaleTimeString(); // Hora en formato HH:mm:ss
        const insertEntradaQuery = 'INSERT INTO entradas (id_usu, sala_id, asi_id, fecha, hora, monto) VALUES (?, ?, ?, ?, ?, ?)';
        await db.promise().query(insertEntradaQuery, [id_usu, sala_id, asiento, fecha, hora, monto]);

        res.json('Entrada reservada exitosamente');
    } catch (error) {
        console.error('Error al procesar la reserva:', error);
        res.status(500).json('Error al procesar la reserva');
    }
};

module.exports={
    getAllEntradas,
    getEntradaById,
    CreateEntradas,
    uploadEntradas,
    deleteEntradas,
    FrontCarga
}
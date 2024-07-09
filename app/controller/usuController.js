const db=require('../db/db_cine');

  const getAllUsu = (req,res) =>{ 
     const sql='SELECT * FROM usuarios';
     db.query(sql,(err,result)=>{
         if(err) throw err;
         res.json(result); 
     })
    
  }

 const getUsuById =(req,res) =>{
     const {id} =req.params;
     const sql='SELECT * FROM usuarios WHERE id_usu = ?';
     db.query(sql,[id],(err,result)=>{
         if(err) throw err;
         res.json(result);
  }
 )}


const createNewUsu = (req, res) => {
    const { nombre, apellido, dni, pass, fec_nac } = req.body;
    const fecha = new Date(fec_nac); // Convertir fec_nac a objeto Date
    const fecha_nacimiento = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
    const sql = 'INSERT INTO usuarios(nombre, apellido, dni, pass, fec_nac) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, dni, pass, fecha_nacimiento], (err, result) => {
      if (err) {
        console.error('Error al insertar usuario:', err);
        res.status(500).json({ error: 'Error al insertar usuario en la base de datos' });
      } else {
        res.status(200).json({ mensaje: 'Usuario creado exitosamente' });
      }
    });
  }

 const updateUsu = (req,res) =>{
     const {id} =req.params;
     const {nombre,apellido,dni,pass,fec_nac} = req.body;
     const sql = 'UPDATE usuarios SET nombre=?,apellido=?,dni=?,pass=?,fec_nac=? WHERE id_usu=?';
     db.query(sql,[nombre,apellido,dni,pass,fec_nac,id],(err,result)=>{
         if(err) throw err;
         res.json({mensage:'Usuario actualizado exitosamente'});
     })
 }

 const deleteUsu = (req,res) =>{
     const {id} = req.params;
     const sql = 'DELETE FROM usuarios WHERE id_usu= ?';
     db.query(sql,[id],(err,result) =>{
         if(err) throw err;
         res.json('Usuario eliminado/a');
     })
 }

module.exports ={
    getAllUsu,
    getUsuById,
    createNewUsu ,
    updateUsu,
    deleteUsu
}


const db=require('../db/db_cine');

const getPeliculas = (req,res) =>{ 
    const sql='SELECT * FROM pelicula';
    db.query(sql,(err,result)=>{
         if(err) throw err;
         
         res.json(result); 
         console.log(result);
    });
}

const getInnerPeliculas = (req,res) =>{ 
    const {id} =req.params;
    const sql="SELECT pelicula.titulo FROM pelicula WHERE peli_id=?";
    db.query(sql,[id],(err,result)=>{
         if(err) throw err;
         
         res.json(result); 
         console.log(result);
    });
}


const getPeliculasById =(req,res) =>{
    const {id} =req.params;
    const sql='SELECT * FROM pelicula WHERE peli_id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.json(result);
 })
}

const CreatePeliculas = (req,res) =>{
    const {titulo,formato_id,hora_id} =req.body;
    const sql='INSERT INTO pelicula(titulo) VALUES (?)';
    db.query(sql,[titulo,formato_id,hora_id],(err,result)=>{
        if(err) throw err;
        res.json('Pelicula cargada exitosamente')
    })
}

const updatePeliculas = (req,res) =>{
    const {id} =req.params;
    const {titulo,formato_id,hora_id} = req.body;
    const sql = 'UPDATE pelicula SET titulo=? WHERE peli_id=?';
    db.query(sql,[titulo,formato_id,hora_id,id],(err,result)=>{
        if(err) throw err;
        res.json('Pelicula actualizada exitosamente');
    })
}


const deletePeliculas = (req,res) =>{
    const {id} = req.params;
    const sql = 'DELETE FROM pelicula WHERE peli_id= ?';
    db.query(sql,[id],(err,result) =>{
        if(err) throw err;
        res.json('Pelicula eliminado/a');
    })
}


module.exports={
    getPeliculas,
    getInnerPeliculas,
    getPeliculasById,
    CreatePeliculas,
    updatePeliculas,
    deletePeliculas
 }
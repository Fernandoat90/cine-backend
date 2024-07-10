const db=require('../db/db_cine');

const gethorarios = (req,res) =>{ 
    const {id} =req.params;
    const sql="SELECT * FROM salas INNER JOIN horario ON salas.hora_id=horario.hora_id WHERE peli_id=? ORDER BY horario.hora_peli";
    db.query(sql,[id],(err,result)=>{
         if(err) throw err;
         
         res.json(result); 
         console.log(result);
    });
}

const getFormato = (req,res) =>{ 
    const {pelis,hora} =req.params;
    const sql="SELECT * FROM salas INNER JOIN formato ON salas.formato_id=formato.formato_id WHERE peli_id=? and hora_id=?";
    db.query(sql,[pelis,hora],(err,result)=>{
         if(err) throw err;
         
         res.json(result); 
         console.log(result);
    });
}

const getAsiento =(req,res)=>{
    const {pelis,hora,form} = req.params;
    const sql=`SELECT * FROM asiento INNER JOIN salas ON asiento.sala_id=salas.sala_id WHERE salas.peli_id=? and salas.hora_id=? and salas.formato_id=? AND asiento.disponible=true`;
    db.query(sql,[pelis,hora,form],(err,result)=>{
        if(err) throw err;
         
         res.json(result); 
         console.log(result);
    });
}
module.exports={
    gethorarios,
    getFormato,
    getAsiento
}
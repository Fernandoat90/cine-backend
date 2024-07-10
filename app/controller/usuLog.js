const db=require('../db/db_cine');

const getUsuLog = (req, res) => {
    const { dni, pass } = req.body; // Accede a los datos enviados desde el cliente

    const sql = 'SELECT * FROM usuarios WHERE dni = ? AND pass = ?';
    db.query(sql, [dni, pass], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la autenticación del usuario' });
            return;
        }

        if (result.length > 0) {
            // Usuario autenticado correctamente
            res.json(result[0]); // Devuelve el usuario encontrado
        } else {
            // Usuario no encontrado o credenciales incorrectas
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    });
};

module.exports= {getUsuLog};
import connectDB from "../connectDB.js";

const getMyProfile = (req, res) => {
    let {id} = req.params;

    const selectProfile = `SELECT * FROM user WHERE ID_USER = ?`;

    connectDB.con.query(selectProfile, [id], (error, results, fields)=> {
        if(error) throw error;
        console.log(results);
        res.json(results);
    });
}

const putMyProfile = (req, res) => {
    let {id} = req.params;
    let {nombre, username} = req.body;

    const updateData = `UPDATE user SET NOMBRE = ?, USERNAME = ? WHERE ID_USER= ?`;
    connectDB.con.query(updateData, [nombre,username, id], (error, results, fields) => {
        if(error) res.json({err:true, msg: 'Error al actualizar el perfil'});
        res.json({err: null, msg:'Actualizacion completada'});
    })
}

const deleteMyProfile = (req, res) => {
    let { id } = req.params;

    const deleteData = `DELETE FROM user WHERE ID_USER = ?`;
    connectDB.con.query(deleteData, [id], (error, results, fields) => {
        if(error) res.json({err:true, msg:'error al borrar la cuenta, no se puede borrar esta cuenta'});
        res.json({err: null, msg: 'Cuenta borrada exitosamente'});
    })
}

export default {
    getMyProfile,
    putMyProfile,
    deleteMyProfile
};
import connectDB from "../connectDB.js";
import { deleteFile, ulpoadFile } from "../utils/uploadFiles.js";

const getMyProfile = (req, res) => {
    let { id } = req.params;

    const selectProfile = `SELECT * FROM user WHERE ID_USER = ?`;

    connectDB.con.query(selectProfile, [id], (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        res.json(results);
    });
}

const putMyProfile = (req, res) => {
    let { id } = req.params;
    let { nombre, username, image } = req.body;
    let imageName = null;
    const deleteProfileImage = `SELECT IMAGE FROM user WHERE ID_USER = ?`;

    if (image) {
        imageName = ulpoadFile(image);
        connectDB.con.query(deleteProfileImage, [id], (error, results, fields) => {
            if (error) throw error;
            deleteFile(results[0]['IMAGE']);
        })
    }
    
    const updateData = (image)?
        `UPDATE user SET NOMBRE = ?, USERNAME = ?, IMAGE = ? WHERE ID_USER= ?`:
        `UPDATE user SET NOMBRE = ?, USERNAME = ? WHERE ID_USER= ?`;

    const parameters = (image)?
        [nombre, username, imageName, id]:
        [nombre, username, id];

    connectDB.con.query(updateData, parameters, (error, results, fields) => {
        console.log(error);
        if (error) res.json({ err: true, msg: 'Error al actualizar el perfil' });
        res.json({ err: null, msg: 'Actualizacion completada' });
    })
}

const deleteMyProfile = (req, res) => {
    let { id } = req.params;

    const deleteData = `DELETE FROM user WHERE ID_USER = ?`;
    const deleteProfileImage = `SELECT IMAGE FROM user WHERE ID_USER = ?`;

    DB.con.query(deleteProfileImage, [id], (error, results, fields) => {
        if (error) throw error;
        deleteFile(results[0]['IMAGE']);
    })

    connectDB.con.query(deleteData, [id], (error, results, fields) => {
        if (error) res.json({ err: true, msg: 'error al borrar la cuenta, no se puede borrar esta cuenta' });
        res.json({ err: null, msg: 'Cuenta borrada exitosamente' });
    })
}

export default {
    getMyProfile,
    putMyProfile,
    deleteMyProfile
};

import DB from '../connectDB.js';
import { deleteFile, ulpoadFile } from '../utils/uploadFiles.js';

const getPosted = (req, res) => {
    // los posts del usuario logeado 
    let {id} = req.params;

    if(id){
        // const selectPostedByID = `SELECT * FROM post WHERE ID_USER = ?`

        const selectPostedByID = `SELECT user.USERNAME, user.IMAGE, post.CONTENIDO, post.IMAGE AS IMAGE_POST, post.ID_USER, post.ID_POST, post.FECHA FROM post
        INNER JOIN user ON user.ID_USER = post.ID_USER
        WHERE post.ID_USER = ?;`

        DB.con.query(selectPostedByID, [id], (error, results, fields) => {
            if(error) throw error;

            res.json(results);
        })
    
    }else{
        // Todos los post de todos los usuarios
        const selectPosted = `SELECT user.USERNAME, user.IMAGE, post.CONTENIDO, post.IMAGE AS IMAGE_POST, post.ID_USER, post.ID_POST, post.FECHA FROM post
        INNER JOIN user ON user.ID_USER = post.ID_USER;`;

        DB.con.query(selectPosted, (error, results, fields)=> {
            if(error) throw error;

            res.json(results);
        })
    }
};

const postPosted = (req, res) => {
    let {id} = req.params;
    let {contenido, image} = req.body;
    let imageName = null;

    if (image) imageName = ulpoadFile(image);

    const date = new Date();

    let fecha = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;

    const insertPos = `INSERT INTO post(CONTENIDO, FECHA, ID_USER, IMAGE) VALUES(?,?,?,?)`;
    
    DB.con.query(insertPos, [contenido, fecha, id, imageName], (error, results, fields) => {

        if(error) return res.json({err: error});

        res.json({err: null, msg:'Post created', results});
    })
};

const putPosted = (req, res) => {
    let {idPost} = req.params;
    let {user} = req.query;
    let {contenido, image} = req.body;
    let imageName = null;    
    const deletePostImage = `SELECT IMAGE FROM post WHERE ID_POST = ?`;

    if (image) {
        imageName = ulpoadFile(image);
        DB.con.query(deletePostImage, [idPost], (error, results, fields) => {
            if(error) throw error;
            deleteFile(results[0]['IMAGE']);
        })
    } 

    const updatePut = (image)?
    `UPDATE post SET CONTENIDO = ?, IMAGE = ? WHERE ID_POST = ? AND ID_USER = ?`:
    `UPDATE post SET CONTENIDO = ? WHERE ID_POST = ? AND ID_USER = ?`;

    const parameters = (image)?
        [contenido, imageName, idPost, user]:
        [contenido, idPost, user];

    DB.con.query(updatePut, parameters, (error, results, fields) => {
        if(error) res.json({err: error});
        res.json({err: null, msg: 'post modified', results});
    })
}

const deletePosted = (req, res) => {
    let {idPost} = req.params;
    let {user} = req.query;
    const deletepost = `DELETE FROM post WHERE ID_POST = ? AND ID_USER = ?`
    const deletePostImage = `SELECT IMAGE FROM post WHERE ID_POST = ?`;

    DB.con.query(deletePostImage, [idPost], (error, results, fields) => {
        if(error) throw error;
        deleteFile(results[0]['IMAGE']);
    })

    DB.con.query(deletepost, [idPost, user], (error, results, fields) => {
        if(error) throw error;
        res.json({msg: 'post deleted', results});
    })
}
export default {
    getPosted,
    postPosted,
    putPosted,
    deletePosted

}
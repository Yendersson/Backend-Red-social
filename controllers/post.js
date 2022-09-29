import DB from '../connectDB.js';

const getPosted = (req, res) => {
    // los posts del usuario logeado 
    let {id} = req.params;

    if(id){
        // const selectPostedByID = `SELECT * FROM post WHERE ID_USER = ?`

        const selectPostedByID = `SELECT user.USERNAME, post.CONTENIDO, post.ID_USER, post.ID_POST, post.FECHA FROM post
        INNER JOIN user ON user.ID_USER = post.ID_USER
        WHERE post.ID_USER = ?;`

        DB.con.query(selectPostedByID, [id], (error, results, fields) => {
            if(error) throw error;

            res.json(results);
        })
    
    }else{
        // Todos los post de todos los usuarios
        const selectPosted = `SELECT user.USERNAME, post.CONTENIDO, post.ID_USER, post.ID_POST, post.FECHA FROM post
        INNER JOIN user ON user.ID_USER = post.ID_USER;`;

        DB.con.query(selectPosted, (error, results, fields)=> {
            if(error) throw error;

            res.json(results);
        })
    }
};

const postPosted = (req, res) => {
    let {id} = req.params;
    let {contenido} = req.body;

    const date = new Date();

    let fecha = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;

    const insertPos = `INSERT INTO post(CONTENIDO, FECHA, ID_USER) VALUES(?,?,?)`;
    
    DB.con.query(insertPos, [contenido, fecha, id], (error, results, fields) => {

        if(error) return res.json({err: error});

        res.json({err: null, msg:'Post created', results});
    })
};

const putPosted = (req, res) => {
    let {idPost} = req.params;
    let {user} = req.query;
    let {contenido} = req.body;
    const updatePut = `UPDATE post SET CONTENIDO = ? WHERE ID_POST = ? AND ID_USER = ?`

    DB.con.query(updatePut, [contenido, idPost, user], (error, results, fields) => {
        if(error) res.json({err: error});
        res.json({err: null, msg: 'post modified', results});
    })
}

const deletePosted = (req, res) => {
    let {idPost} = req.params;
    let {user} = req.query;
    const deletepost = `DELETE FROM post WHERE ID_POST = ? AND ID_USER = ?`

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
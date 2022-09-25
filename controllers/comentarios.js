import connectDB from "../connectDB.js";

const getComments = (req, res) => {

    // El parametro post hace referencia al ID del post para la elaboracion de los comentarios
    let {post} = req.params;

    const selectComents = `SELECT COMENTARIOS.COD_COMENTARIO, USER.USERNAME, COMENTARIOS.CONTENIDO, COMENTARIOS.FECHA, COMENTARIOS.ID_POST
    FROM COMENTARIOS
    INNER JOIN USER ON USER.ID_USER = COMENTARIOS.ID_USER
    INNER JOIN POST ON POST.ID_POST = COMENTARIOS.ID_POST
    WHERE COMENTARIOS.ID_POST = ?;`;

    connectDB.con.query(selectComents,[post], (error, results, fields) => {
        if(error) throw error;

        res.json(results);
    })
 }

 const postComments = (req, res) => {
    // Utilizamos el parametro para el ID del post acompañado de una query para el ID del user.
    
    let {post} = req.params;
    let {user} = req.query
    let {contenido} = req.body 
    const date = new Date();
    
    let fecha = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    

    const insertComment = `INSERT INTO COMENTARIOS(ID_USER, ID_POST, CONTENIDO, FECHA) VALUES(?,?,?,?)`;

    connectDB.con.query(insertComment, [user, post, contenido, fecha], (error, results, fields) => {
        if(error) throw error;

        res.json(results);
    })
 }

//  const putComments = (req, res) =>{
//     let {comentario} = req.params;
//     let {contenido} = req.body;

//     const updateComment = `UPDATE COMENTARIOS SET CONTENIDO = ? WHERE COD_COMENTARIO = ?`;
//     connectDB.con.query(updateComment, [contenido, comentario], (error, results, fields) => {
//         if(error) throw error;

//         res.json(results);
//     })
//  };

//  const deleteComments = (req, res) => {
//     let {comentario} = req.params;

//     const removeComment = `DELETE FROM COMENTARIOS WHERE COD_COMENTARIO = ?`;
//     connectDB.con.query(removeComment, [comentario], (error, results, fields) => {
//         if(error) throw error;
//         res.json(results);
//     })
//  };

 export default {
    getComments,
    postComments,
    // putComments,
    // deleteComments
 }
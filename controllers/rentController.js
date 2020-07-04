let connection = require('../config/db.js');
let rentController = {};
let fs = require('fs');


//CREAR lista de renting
rentController.rentingList = (req, res) => {
  
  let sql = `SELECT * FROM user_movies
              JOIN movies on movies.id_movie = user_movies.id_movie
              JOIN customers on customers.id_user = user_movies.id_user
              AND customers.id_user = user_movies.id_user;`;
  connection.query(sql, (err, result) => {
    console.log(result)
      res.render('listRent', { result });
  })
};


//DELETE renting
rentController.deleteRent = (req, res) => {
  let id_transaction = req.params.id_transaction;

  let sql = `DELETE FROM user_movies WHERE id_transaction = ${id_transaction}`;
  connection.query(sql, (err, result) => {
          res.redirect('/rents/listRenting')
      })
};

//VIEW RENT
rentController.viewFormRenting = (req,res)=>{
  res.render('viewRent');
}

//Create Renting
rentController.saveRenting = (req, res)=>{
  const {id_user, id_movie}= req.body;

  let sql = `INSERT INTO user_movies (id_user, id_movie) VALUES (${id_user}, ${id_movie})`;

  connection.query(sql, (err, result)=>{
    if(err)throw err;
    res.redirect('/rents/listRenting')
  })
}

//View Single Rent Render de viewSingleRent y select de id
rentController.viewSingleRenting = (req, res) =>{
  let id_transaction = req.params.id_transaction;

  let sql = `SELECT * FROM user_movies WHERE id_transaction = ${id_transaction}`;
  connection.query(sql, (err, result)=>{
    if(err)throw err;
    res.render('viewSingleRent', {result})
  })
}


//Update Rent recojo los datos y actualizo en bd

rentController.updateRenting = (req, res)=>{
  let id_transaction = req.params.id_transaction;
  const {id_user, id_movie}= req.body;

  let sql = `UPDATE user_movies SET id_user = '${id_user}',
             id_movie = '${id_movie}'
              WHERE id_transaction = ${id_transaction} `

  connection.query(sql, (err, result)=>{
    if (err)throw err;
    res.redirect('/rents/listRenting')
  })            
}



module.exports = rentController;
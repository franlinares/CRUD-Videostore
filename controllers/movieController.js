let connection = require('../config/db.js');
let movieController = {};
let fs = require('fs');


//CREAR oppening
movieController.openningMovies = (req, res) => {
   res.render('movies');  
};
// Lista de movies
movieController.listOfMovies = (req, res) => {
  let sql = `SELECT * FROM movies`;
  connection.query(sql, (err, result) => {
    if(err)throw err;
      res.render('listMovies', { result });
  })
};

// FORM para movies
movieController.listFormMovie = (req, res) => {
  res.render('saveMovie');
};

//CREATE a MOVIE
movieController.guardarMovie = (req, res) => {
  
  let title = req.body.title;
  let description = req.body.description;
  let release_date = req.body.release_date;
  let gender = req.body.gender;

  let sql = `INSERT INTO movies(title, description, release_date, gender) VALUES ('${title}', '${description}', '${release_date}', '${gender}')`;
  connection.query(sql, (err, result)=>{
    if(err)throw err;
    res.redirect('/movies/listMovies');
  }); 

};

//DELETE Movie
movieController.deleteMovie = (req, res) => {
  let id_movie = req.params.id_movie;

  let sql = `DELETE FROM movies WHERE id_movie = ${id_movie}`;
  connection.query(sql, (err, result) => {
          res.redirect('/movies/listMovies')
      })
};

//HACER el VIEW de una MOVIE
movieController.viewSingleMovie = (req, res) =>{
  let id_movie = req.params.id_movie;

  let sql = `SELECT * FROM movies WHERE id_movie = ${id_movie}`;

  connection.query(sql, (err, result)=>{
    if (err) throw err;
    res.render('viewMovie', {result: result[0]});
  });
};

//UPDATE MOVIE
movieController.updateMovie = (req, res) => {
  let id_movie = req.params.id_movie;
  let title = req.body.title;
  let description = req.body.description;
  let release_date = req.body.release_date;
  let gender = req.body.gender

    let sql = `UPDATE movies SET title = '${title}', description = '${description}', release_date = '${release_date}', gender = '${gender}' WHERE id_movie = ${id_movie}`;
    connection.query(sql, (err, result) =>{
      if(err)throw err;
      res.redirect('/movies/listMovies')
    })

}

//BUSCADOR
//http://localhost:3000/movies/title?search=kkk

movieController.search = (req, res) =>{ 
  let querySearchMovie = `select * from movies where title like '%${req.query.search}%' or gender like '%${req.query.search}%' or description like '%${req.query.search}%' or release_date like '%${req.query.search}%'`;
  connection.query(querySearchMovie, (err,result) =>{
      if (err) throw err;
      res.render('listMovies',{result});
  })
}

module.exports = movieController;
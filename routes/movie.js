var express = require('express');
var router = express.Router();
//libreria para subir imagenes
let multer = require('multer');
const movieController = require('../controllers/movieController');

const storage = multer.diskStorage({
 
  destination: "public/images",

  filename: (_req, file, cb) => {
      const extension = file.originalname.slice(
          file.originalname.lastIndexOf(".")
      );
      //cambio del nombre de la imagen
      cb(null, new Date().valueOf() + extension);
  }
});
const upload = multer({ storage }).single("avatar");

/*--------------------------------*/
//Inicio de la pagina
router.get('/', movieController.openningMovies);
// Lista de Movies
router.get('/listMovies', movieController.listOfMovies);
//Form movie
router.get('/movieForm', movieController.listFormMovie);
//Create a movie
router.post('/saveMovie', movieController.guardarMovie);
//Delete
router.get('/deleteMovie/:id_movie', movieController.deleteMovie);
//view single movie
router.get('/singleMovie/:id_movie', movieController.viewSingleMovie);
//UPDATE
router.post('/updateMovie/:id_movie', movieController.updateMovie);
//BUSCADOR 
router.get('/search', movieController.search);





module.exports = router;
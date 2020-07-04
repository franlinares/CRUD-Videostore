var express = require('express');
var router = express.Router();
//libreria para subir imagenes
let multer = require('multer');
const rentController = require('../controllers/rentController');

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

//Inicio de la pagina rents
router.get('/listRenting', rentController.rentingList );
//Delete
router.get('/deleteRent/:id_transaction', rentController.deleteRent);
//REnting create renting
router.get('/createRenting', rentController.viewFormRenting);
//localhost:3000/renting/createRenting
router.post('/createRent', rentController.saveRenting)
//localhost:3000/rents/viewsinglerent/:id_transaction
router.get('/viewSingleRent/:id_transaction', rentController.viewSingleRenting)
//update rent
router.post('/updateRent/:id_transaction', rentController.updateRenting)

module.exports = router;
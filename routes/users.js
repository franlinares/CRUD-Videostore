var express = require('express');
var router = express.Router();
//libreria para subir imagenes
let multer = require('multer');
const userController = require('../controllers/userController');

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
//Inicio de la pagina users
router.get('/listUsers', userController.openningUsers);
//Form user
router.get('/userForm', userController.listFormUser);
//Create a user
router.post('/saveUser', userController.guardarUser);
//Delete
router.get('/deleteUser/:id_user', userController.deleteUser);
//view single user
router.get('/singleUser/:id_user', userController.viewSingleUser);
//UPDATE
router.post('/updateUser/:id_user', userController.updateUser);

module.exports = router;

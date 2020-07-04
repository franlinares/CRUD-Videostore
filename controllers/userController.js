let connection = require('../config/db.js');
let userController = {};
let fs = require('fs');

//CREAR lista de User
userController.openningUsers = (req, res) => {
  let sql = `SELECT * FROM customers`;
  connection.query(sql, (err, result) => {
      res.render('listUsers', { result });
  })
};

// FORM para users
userController.listFormUser = (req, res) => {
  res.render('saveUser');
};

//CREATE a User
userController.guardarUser = (req, res) => {
  
  let name = req.body.name;
  let last_name = req.body.last_name;
  let phone = req.body.phone;
  let address = req.body.address;

  let sql = `INSERT INTO customers(name, last_name, phone, address) VALUES ('${name}', '${last_name}', ${phone}, '${address}')`;
  connection.query(sql, (err, result)=>{
    if(err)throw err;
    res.redirect('/users/listUsers');
  }); 

};

//DELETE user
userController.deleteUser = (req, res) => {
  let id_user = req.params.id_user;

  let sql = `DELETE FROM customers WHERE id_user = ${id_user}`;
  connection.query(sql, (err, result) => {
          res.redirect('/users/listUsers')
      })
};

//HACER el VIEW de un USER
userController.viewSingleUser = (req, res) =>{
  let id_user = req.params.id_user;

  let sql = `SELECT * FROM customers WHERE id_user = ${id_user}`;

  connection.query(sql, (err, result)=>{
    if (err) throw err;
    res.render('viewUser', {result: result[0]});
  });
};

//UPDATE USER
userController.updateUser = (req, res) => {
  let id_user = req.params.id_user;
  let name = req.body.name;
  let last_name = req.body.last_name;
  let phone = req.body.phone;
  let address = req.body.address;

    let sql = `UPDATE customers SET name = '${name}', last_name = '${last_name}', phone = ${phone}, address = '${address}' WHERE id_user = ${id_user}`;
    connection.query(sql, (err, result) =>{
      if(err)throw err;
      res.redirect('/users/listUsers')
    })

}

module.exports = userController;
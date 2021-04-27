const mysql = require('mysql2');

const con = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'receitas', password: '1234'}
);

const getAllCategories = async () => {
  return await con.promise().query("SELECT * from categories")
    .then( ([rows,fields]) => {
      console.log(rows);
      return rows
    })
    .catch(console.log)
    .then( () => con.end());


}

module.exports = {
  getAllCategories
}
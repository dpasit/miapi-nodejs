var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool()
// Http verb  route
// GET        /users/
// POST       /users/
// GET        /users/:id

// localhost:3000/users
/* GET users listing. */
router.get('/', function (req, res, next) {
  //Query es una función que recibe 2 parametros
  //   query(        String        ,    Callback    )
  pool.query("Select * from users;", (errors, result) => {
    if (errors) {
      res.json(errors)
    } else {
      res.json(result.rows);
    }
  })
});

// get user by id localhost:3000/users/1 EJ
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const client = new Client();
  client.connect();
  const user = await client.query("SELECT * FROM users where id = $1",[id]);
  client.end();
  res.json(user.rows[0]) // arreglo con objetos user [ {user}, ... ]
});

router.post("/", async (req, res, next) => {
  const { name, birthdate, rut, dv, address } = req.body;
  const client = new Client();
  client.connect();
  const result = await client.query(`
    INSERT INTO users (name, birthdate, rut, dv, address)
    VALUES ($1, $2, $3, $4, $5) RETURNING id;`, [name, birthdate, rut, dv, address])
  client.end();

  const user = { id: result.rows[0].id, name, birthdate, rut, dv, address}
  res.json(user);
})

module.exports = router;

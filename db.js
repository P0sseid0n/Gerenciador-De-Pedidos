const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'mpm0110',
      database : 'gereciando_pedidos'
    }
})

module.exports = knex
const db = require('./db')

class Pedidos{
    async Save({ pedido,  nota, nome, telefone, CEP, endereco, referencia }){
        return (await db.table('pedidos').insert({ pedido,  nota, nome, telefone, CEP, endereco, referencia }))[0]
    }

    async GetAll(){
        return (await db.table('pedidos').select())
    }

    async Delete(id){
        await db.table('pedidos').where({ id: id }).delete()
    }
}

module.exports = new Pedidos()
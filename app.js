const express = require('express');
const app = express()
const http = require('http').createServer(app)
const Pedidos = require('./Pedidos')

const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine','ejs');

app.get('/', async (req, res) => {
    const pedidos = await Pedidos.GetAll()
    res.render('index', { pedidos })
})

app.post('/', async (req, res) => {
    const { pedido, nota, nome, telefone, CEP, endereco, referencia } = req.body

    if(!pedido || !nome || !telefone || !CEP || !endereco) {
        res.status(400)
        res.send('Valor faltando')
        return
    }

    try{
        const pos = await Pedidos.Save({ pedido,  nota, nome, telefone, CEP, endereco, referencia })
        io.emit('render', { id: pos, pedido,  nota, nome, telefone, CEP, endereco, referencia })
        
        res.status(200)
        res.send('OK')
    } catch (err) {
        res.status(500)
        res.json(err)
    }
})

app.delete('/', (req, res) => {
    const id = req.body.id

    if(isNaN(id)){
        res.status(400)
        res.send('ID incorreto')
        return
    }

    try{
        Pedidos.Delete(id)
        res.status(200)
        res.send('OK')
    } catch(err){
        res.status(500)
        res.json(err)
    }
})

http.listen(PORT, () => console.log(`ONLINE PORT: ${PORT}`))

/*
io.on('connection', (socket) => {
    socket.on('message', data => {
        console.log(data)
        io.emit('renderMessage', { author: data.author, message: data.message })
    })
})
*/
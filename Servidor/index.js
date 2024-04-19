import express from "express"

const app = express()

app.listen(3000)

app.get('/usuarios', (req, res) => res.send('Obteniendo usuarios'))

console.log("Server en puerto 3000 ")
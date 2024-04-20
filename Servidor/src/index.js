import express from "express"
import usuariosRoutes from "./routes/usuarios.js"
import indexRoutes from './routes/index.js'
const app = express()

app.listen(3000)

app.use(express.json())

app.use('/api',usuariosRoutes)
app.use(indexRoutes)


console.log("Server en puerto 3000 ")
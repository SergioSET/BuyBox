import express from "express"
import usuariosRoutes from "./routes/usuarios.js"
import indexRoutes from './routes/index.js'
import cors from "cors";

const app = express()

app.use(cors({
    origin: 'http://localhost:3001', // Permitir solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }));

app.listen(3000)

app.use(express.json())

app.use('/api',usuariosRoutes)
app.use(indexRoutes)


console.log("Server en puerto 3000 ")
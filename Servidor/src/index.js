import express from "express"
import usuariosRoutes from "./routes/usuarios.js"
import indexRoutes from './routes/index.js'
import ordersRoutes from './routes/orders.js'
import productsRoutes from './routes/products.js'
import cors from "cors";

const app = express()

app.use(cors({
  origin: ['http://localhost:5173'], // Permitir solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
  credentials: true, // Encabezados permitidos
}));

app.listen(3000)

app.use(express.json())

app.use('/api', usuariosRoutes)
app.use('/api', ordersRoutes)
app.use('/api', productsRoutes)
app.use(indexRoutes)
app.use(ordersRoutes)


console.log("Server en puerto 3000 ")
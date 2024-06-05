import express from "express"
import bodyParser from 'body-parser';
import usuariosRoutes from "./routes/usuarios.js"
import indexRoutes from './routes/index.js'
import ordersRoutes from './routes/orders.js'
import productsRoutes from './routes/products.js'
import carritoRoutes from './routes/carrito.js'
import cors from "cors";

const app = express()

// Configuración de body-parser para analizar solicitudes codificadas en URL y JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.use('/api', carritoRoutes)
app.use(indexRoutes)
app.use(ordersRoutes)




console.log("Server en puerto 3000 ")
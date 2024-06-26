import express  from "express";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import db from "./config/db";
import colors from "colors"
import { swaggerSpec } from "./config/swagger";


export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue("conexion exit"))
    } catch (error) {
        console.log(colors.red.bold("Hubo un error en la conexion a la bd"))
    }
}
connectDB()

const server = express();
server.use(express.json())
server.use("/api/products", router)


//DOCS
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


export default server
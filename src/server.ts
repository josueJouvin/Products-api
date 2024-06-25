import express  from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors"


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



export default server
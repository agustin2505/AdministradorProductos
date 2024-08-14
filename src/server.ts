import  express  from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'



//Conectar a base de datos
async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue.bold('Conexión exitosa a la BD'))
    } catch (error) {
        //console.log(error)
        console.log(colors.bgRed.white('Hubo un error al conectar a la BD'))
    }
}

connectDB()


//Instancia de express
const server = express()

//Leer datos de formularios(json)
server.use(express.json())

server.use('/api/products',router)

server.get('/api',(req,res) => {
    res.json({msg:'Desde api'})
})



export default server




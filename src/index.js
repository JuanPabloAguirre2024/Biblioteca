const express = require("express");
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors")

//Configuración inicial
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Escuchando comunicaciones al puerto"+app.get("port"));

//Middlewarses
app.use(cors({
    origin: ["http://127.0.0.1:5501","http://127.0.0.1:5000"]
}))
app.use(morgan("dev"));


//Rutas
app.get("/libros", async (req,res) =>{
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * from libro");
  res.json(result)
 })
 app.post("/libro/prestar", async (req, res) => {
   if(req.body.length > 0){
     return res.sendStatus(400);
   }
   res.sendStatus()
 })


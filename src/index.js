const express = require("express");
const morgan = require("morgan");
const database = require("./database");

//Configuración inicial
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Escuchando comunicaciones al puerto"+app.get("port"));

//Middlewarses
app.use(morgan("dev"));


//Rutas
app.get("/libros", async (req,res) =>{
  res.json([
    {
      id:1,
      nombre: "Cien años de soledad",
      precio: 80000,
    },
    {
      id:2,
      nombre: "El insomio",
      precio: 50000,
    },
    {
      id:3,
      nombre: "El principito",
      precio: 70000,
    },
    {
      id:4,
      nombre: "Crónica de una muerte anunciada",
      precio: 150000,
    },
    {
      id:5,
      nombre: "Hasta que la muerte nos separe",
      precio: 30000,
    },
    {
      id:6,
      nombre: "La Odisea",
      precio: 200000,
    }  
  ])
 })

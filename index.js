const express = require("express");
const app = express();
const port = 3127;

app.use(express.json());

// Datos de prueba
let libros = [
    { id: 1, titulo: "100 años de soledad", precio: 40000},
    { id: 2, titulo: "Odisea", precio: 50000},
    { id: 3, titulo: "Crónica de una muerte anunciada", precio: 20000},
    { id: 4, titulo: "Don Quijote de la mancha", precio: 30000},
    { id: 5, titulo: "El principito", precio: 10000},
];

app.get("/", (req, res) => {

    return res.json(libros);
});

app.get("/mis-libros", (req, res) => {

    return res.json([
        libros[0],
        libros[3]
    ])
});

app.post("/guardar-libro", (req, res) => {
    let nuevoLibro = {
        id: libros.length + 1,
        titulo: req.body.titulo,
        precio: req.body.precio
    };

    libros.push(nuevoLibro);

    return res.status(200).json(nuevoLibro);
})

app.listen(port, () => {
    console.log("Servidor de node escuchando en http://localhost:"+port)
});
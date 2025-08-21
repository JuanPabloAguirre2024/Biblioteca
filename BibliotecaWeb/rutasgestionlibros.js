const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

// Configuración para guardar portadas
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Añadir libro
router.post('/add', upload.single('portada'), (req, res) => {
    const { titulo, sinopsis, autor, estado } = req.body;
    const portada = req.file ? req.file.filename : null;

    const sql = 'INSERT INTO Libros (titulo, sinopsis, id_autor, estado, portada) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [titulo, sinopsis, autor, estado, portada], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Libro añadido correctamente');
    });
});

// Obtener todos los libros
router.get('/', (req, res) => {
    const sql = `
        SELECT L.*, A.nombre AS autor_nombre 
        FROM Libros L 
        JOIN Autores A ON L.id_autor = A.id_autor
    `;
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

// Editar libro
router.put('/edit/:id', upload.single('portada'), (req, res) => {
    const { titulo, sinopsis, autor, estado } = req.body;
    const { id } = req.params;
    const portada = req.file ? req.file.filename : null;

    let sql = 'UPDATE Libros SET titulo=?, sinopsis=?, id_autor=?, estado=?';
    const params = [titulo, sinopsis, autor, estado];

    if (portada) {
        sql += ', portada=?';
        params.push(portada);
    }

    sql += ' WHERE id_libro=?';
    params.push(id);

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Libro actualizado');
    });
});

// Eliminar libro
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Libros WHERE id_libro = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Libro eliminado');
    });
});

module.exports = router;
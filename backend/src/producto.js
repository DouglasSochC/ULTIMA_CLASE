const express = require('express');
const multer = require('multer');
const fs = require('fs');
const XLSX = require('xlsx');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Variable temporal para almacenar los productos
const productos = [];

router.get('/obtener-producto', (req, res) => {
    res.send(productos);
});

// Subir un archivo
// Nuevo comentario se me olvido agregar el archivo
router.post('/carga-masiva', upload.single('file'), (req, res) => {

    if (!req.file) {
        return res.status(400).send({ message: 'No se ha subido un archivo' });
    }

    fs.readFile(req.file.path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error al leer el archivo' });
        }

        try {
            const jsonData = JSON.parse(data);

            jsonData.forEach(element => {
                productos.push(element);
            });

            // Eliminar el archivo correctamente
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al eliminar el archivo' });
                }
            });

            return res.send({ message: 'Carga realizada correctamente' });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'Error al procesar el archivo' });
        }

    });

});

// Ruta para descargar los productos
router.get('/descargar-productos', (req, res) => {

    // Crear un libro de trabajo
    const workbook = XLSX.utils.book_new();

    // Crear una hoja de calculo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(productos);

    // Aniadir la hoja de calculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

    // Generar el archivo Excel en un buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Configurar los headres de la respuesta
    res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Enviar el archivo como respuesta
    res.send(excelBuffer);
});

// Ruta para modificar un producto segun su id
router.put('/modificar-producto/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, precio } = req.body;

    const producto = productos.find(producto => producto.id == id);

    if (producto) {
        producto.nombre = nombre;
        producto.precio = precio;
        return res.send({ message: 'Producto modificado correctamente' });
    }

    return res.status(404).send({ message: 'Producto no encontrado' });
});

// Ruta para eliminar un producto segun su id
router.delete('/eliminar-producto/:id', (req, res) => {
    const id = req.params.id;

    const index = productos.findIndex(producto => producto.id == id);

    if (index !== -1) {
        productos.splice(index, 1);
        return res.send({ message: 'Producto eliminado correctamente' });
    }

    return res.status(404).send({ message: 'Producto no encontrado' });
});

module.exports = router;
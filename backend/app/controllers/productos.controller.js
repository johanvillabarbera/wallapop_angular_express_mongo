const db = require("../models");
const Producto = db.productos;

// Crear y guardar un Producto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Crear un Producto
  const producto = new Producto({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    precio: req.body.precio,
    f_pub: new Date
  });

  // Guardar Producto en la base de datos
  producto
    .save(producto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Producto."
      });
    });
};

// Todos los productos
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Producto.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Producto indicado por Id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Producto.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Producto with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Producto with id=" + id });
    });
};

// Modificar un Producto indicado por Id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Producto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Producto with id=${id}. Maybe Producto was not found!`
        });
      } else res.send({ message: "Producto was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Producto with id=" + id
      });
    });
};

// Eliminar un Producto indicado por Id
exports.delete = (req, res) => {
  const id = req.params.id;

  Producto.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Producto with id=${id}. Maybe Producto was not found!`
        });
      } else {
        res.send({
          message: "Producto was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Producto with id=" + id
      });
    });
};

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Tutorials were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };


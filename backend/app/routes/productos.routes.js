module.exports = app => {
    const productos = require("../controllers/productos.controller.js");
  
    var router = require("express").Router();
  
    // Todos los productos
    router.get("/", productos.findAll);
  
    // Producto indicado por Id
    router.get("/:id", productos.findOne);

    // Crear un producto
    router.post("/", productos.create);
  
    // Modificar un producto indicado por Id
    router.put("/:id", productos.update);
  
    // Eliminar un producto indicado por Id
    router.delete("/:id", productos.delete);
  
    app.use("/api/productos", router);
  };
  
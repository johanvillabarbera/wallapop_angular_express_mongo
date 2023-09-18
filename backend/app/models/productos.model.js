module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        titulo: String,
        descripcion: String,
        imagen: String,
        precio: Number,
        f_pub: Date
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Producto = mongoose.model("producto", schema);
    return Producto;
  };
  
const mongoose = require("mongoose");

const kudosSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idRemitente: Number,
    idDestinatario: Number,   
    fecha: Date,
    lugar: String,
    tema: String,
    texto: String
});

var KudosModel = mongoose.model("Kudos", kudosSchema);

module.exports = KudosModel;
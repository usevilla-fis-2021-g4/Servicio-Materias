const {Schema, model} = require ('mongoose');

const MateriasSchema = new Schema({
    nombre: {type: String},
    descripcion: {type: String},
    area: {type: String}
},{
    timestamps: true


});

module.exports = model('Materia', MateriasSchema);
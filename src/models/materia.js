const mongoose = require('mongoose');

const MateriasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },

});

MateriasSchema.methods.limpiar = function(){
    //return this;
    return {_id: this._id, nombre: this.nombre, descripcion: this.descripcion, area: this.area};
}

const Materia = mongoose.model('Materia', MateriasSchema);

module.exports = Materia;
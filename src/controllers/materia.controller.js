const materiaCtrl = {};

const Materia = require('../models/materia');

materiaCtrl.getMaterias = async (req, res) => {
    const materias = await Materia.find();
    res.json(materias);
};

materiaCtrl.createMateria = async (req, res) => {
    const { nombre, descripcion, area } = req.body;
    const newMateria = new Materia({
        nombre,
        descripcion,
        area
    });
    await newMateria.save();
    res.json('Nueva materia creada');
};

materiaCtrl.getMateria = async (req, res) => {
    const materia = await Materia.findById(req.params.id);
    res.json(materia);
}

materiaCtrl.deleteMateria = async (req, res) => {
    await Materia.findByIdAndDelete(req.params.id)
    res.json('Materia eliminada');
}

materiaCtrl.updateMateria = async (req, res) => {
    const { nombre, descripcion, area } = req.body;
    await Materia.findByIdAndUpdate(req.params.id, {
        nombre,
        descripcion,
        area
    });
    res.json('Materia modificada');
}

module.exports = materiaCtrl;
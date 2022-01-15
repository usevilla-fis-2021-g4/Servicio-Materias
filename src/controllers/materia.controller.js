const materiaCtrl = {};

const Materia = require('../models/materia');

materiaCtrl.getMaterias = async (req, res) => {

    Materia.find({}, (err, materias) => {
        if(err){
            console.log(Date() + "-" + err);
            res.sendStatus(500);
        }else{
            res.send(materias.map((materia) => {
                return materia;
            }))
        }
    })
}

    materiaCtrl.createMateria = async (req, res) => {
   
   const { nombre, descripcion, area } = req.body;
           const materia = new Materia({
               nombre,
               descripcion,
               area
           });
           Materia.create(materia, (err) => {
               if (err) {
                 console.log(Date() + " - " + err);
           
                 if (err.errors) {
                   res.status(400).send({ error: err.message })
                 } else {
                   res.sendStatus(500);
                 }
               } else {
                 res.status(201).json(materia);
               }
             });
   };

   materiaCtrl.getMateria = async (req, res) => {

    Materia.findById({_id:req.params.id}, (err, materia) => {
        if (err) {
          console.log(Date() + " - " + err);
          res.sendStatus(500);
        } else {
          res.send(materia);
        }
      });
}

materiaCtrl.deleteMateria = async (req, res) => {

    Materia.findByIdAndDelete({ _id: req.params.id }, (err, materia) => {
      if (err) {
        console.log(Date() + " - " + err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
        return materia;
      }
    });

}

materiaCtrl.updateMateria = async (req, res) => {

       let id = req.params.id;
       var data = req.body;
       const filter = { _id: id };
       Materia.findOneAndUpdate(filter, data, (err, materia) => {
         if (err) {
           console.log(Date() + " - " + err);
     
           if (err.errors) {
             res.status(400).send({ error: err.message })
           } else {
             res.sendStatus(500);
           }
         } else {
           materia.data = data;
           res.send(materia);
         }
       });
 
 }

module.exports = materiaCtrl;
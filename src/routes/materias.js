const { Router } = require('express');
const router = Router();

const { getMaterias, createMateria, getMateria, deleteMateria, updateMateria } = require('../controllers/materia.controller');

router.route('/')
 .get(getMaterias)
 .post(passport.authenticate("localapikey", {session: false}),createMateria);

router.route('/:id')
 .get(getMateria)
 .delete(passport.authenticate("localapikey", {session: false}),deleteMateria)
 .put(passport.authenticate("localapikey", {session: false}),updateMateria);

module.exports = router;
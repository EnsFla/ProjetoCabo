const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');
const autorizar = require('../middlewares/autorizar');

router.post('/', auth, autorizar('admin'), controller.cadastrarUsuario);
router.get('/', auth, autorizar('admin'), controller.listarUsuarios);
router.put('/:id', auth, autorizar('admin'), controller.atualizarUsuario);
router.delete('/:id', auth, autorizar('admin'), controller.removerUsuario);

module.exports = router;

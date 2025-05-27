const express = require('express');
const router = express.Router();
const controller = require('../controllers/ferramentaController');

router.post('/', controller.solicitarFerramenta);
router.get('/usuario/:usuario_id', controller.listarPorUsuario);
router.get('/almoxarife/:usuario_id', controller.listarParaAlmoxarife);
router.put('/:id/aceitar', controller.aceitar);
router.put('/:id/rejeitar', controller.rejeitar);
router.put('/:id/concluir', controller.concluir);

module.exports = router;

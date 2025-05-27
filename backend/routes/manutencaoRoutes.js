const express = require('express');
const router = express.Router();
const controller = require('../controllers/manutencaoController');

router.post('/', controller.solicitarManutencao);
router.get('/tecnico/:tecnico_id', controller.listarPendentesTecnico);
router.get('/tecnico/:tecnico_id/aceitas', controller.listarAceitasTecnico);
router.put('/:id/aceitar', controller.aceitarSolicitacao);
router.put('/:id/concluir', controller.concluirSolicitacao);

module.exports = router;

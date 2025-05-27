const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/authController');

router.post('/login', controller.login);
router.post('/logout', auth, controller.logout);
router.post('/refresh', controller.refresh);
router.get('/sessoes', auth, controller.listarSessoes);
router.delete('/sessoes/:id', auth, controller.revogarSessao);

module.exports = router;

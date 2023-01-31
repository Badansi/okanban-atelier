const express = require('express');
const cardController = require('../controllers/cardController');
const router = express.Router();

router.get('/', cardController.getAll);
router.get('/:id', cardController.getOne);
router.post('/', cardController.create);
router.put('/:id', cardController.update);
router.delete('/:id', cardController.delete);

module.exports = router;
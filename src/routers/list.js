const express = require('express');
const listController = require('../controllers/listController');
const router = express.Router();

router.get('/', listController.getAll);
router.get('/:id', listController.getOne);
router.post('/', listController.create);
router.put('/:id', listController.update);
router.delete('/:id', listController.delete);

module.exports = router;
const express = require('express');
const tagController = require('../controllers/tagController');
const router = express.Router();

router.get('/', tagController.getAll);
router.get('/:id', tagController.getOne);
router.post('/', tagController.create);
router.put('/:id', tagController.update);
router.delete('/:id', tagController.delete);

module.exports = router;
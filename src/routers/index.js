const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const listRouter = require('./list');
const cardRouter = require('./card');
const tagRouter = require('./tag');
const authRouter = require('./auth');

const { checkToken } = require('../middlewares/jwt');

router.use('/user', checkToken, userRouter);
router.use('/list', checkToken, listRouter);
router.use('/card', checkToken, cardRouter);
router.use('/tag', checkToken, tagRouter);

router.use('/auth', authRouter);


module.exports = router;
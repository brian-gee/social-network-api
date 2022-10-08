const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought
} = require ('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThought)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)

module.exports = router;
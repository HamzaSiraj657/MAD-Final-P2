const express = require('express');
const { getReviewsByProduct, addReview, updateReview, deleteReview ,postApiGet } = require('../controllers/reviewController');


const router = express.Router();

router.get('/:productId', getReviewsByProduct);
router.post('/:productId', addReview);
router.put('/:id',  updateReview);
router.delete('/:id',  deleteReview);
router.get('/',  postApiGet);

module.exports = router;

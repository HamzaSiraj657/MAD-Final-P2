const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const verifyAdmin = require('../Middleware/verifyAdmin');

router.get('/', getAllProducts);
router.post('/',verifyAdmin, upload.single('image'),  addProduct);
router.put('/:id', verifyAdmin, upload.single('image'),updateProduct);
router.delete('/:id',verifyAdmin, deleteProduct);

module.exports = router;

const router = require('express').Router();
const productCtrl = require('../controllers/productController');

router.get('/products', productCtrl.getProducts);
router.post('/products', productCtrl.createProduct);
router.delete('/products/:id', productCtrl.deleteProduct);
router.put('/products/:id', productCtrl.updateProduct);

module.exports = router;
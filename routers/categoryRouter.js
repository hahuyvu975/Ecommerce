const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryController');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.get('/category', categoryCtrl.getCategories)
router.post('/category', auth, authAdmin, categoryCtrl.createCategory);
router.delete('/category/:id', auth, authAdmin, categoryCtrl.deleteCategory);
router.put('/category/:id', auth, authAdmin, categoryCtrl.updateCategory);

module.exports = router;
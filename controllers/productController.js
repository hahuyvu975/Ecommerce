const Products = require('../models/productModel');

const productCtrl = {
    getProducts: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category } = req.body;
            if(!images) return res.status(400).json({msg: "No image uploaded"})

            const product = await Products.findOne({product_id})

            if(product) return res.status(400).json({msg: "Product already exists"})

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })
            await newProduct.save();
            // return res.status(200).json(newProduct);
            return res.status(200).json({msg:"Created product!!"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete({_id: req.params.id})
            return res.status(200).json({msg: "Product deleted"})
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
}

module.exports = productCtrl;
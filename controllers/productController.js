const Products = require('../models/productModel');

// sort, filter, paginate

class APIfeatures {
    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = {...this.queryString};
       
        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete(queryObj[el]))

       
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
       
        this.query.find(JSON.parse(queryStr))
        console.log(queryStr)
        return this;
    }
    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }else {
            this.query = this.query.sort('createAt')
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit *  1 || 3
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const feature = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()
            const products = await feature.query
            return res.json({
                status: 'success',
                result: products.length,
                products
            })
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
            const { title, price, description, content, images, category } = req.body;
            if(!images) return res.status(400).json({msg: "No image uploaded"})
            await Products.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category
            })
            return res.status(200).json({msg: "Product updated successfully"})
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
}

module.exports = productCtrl;
const Category = require('../models/categoryModel');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (err) {
            return res.status(500).json({ msg: error.message });
        }
    },
    createCategory: async (req, res) => {
        try {
            const name = req.body.name;
            const category = await Category.findOne({ name });
            if (category) return res.status(400).json({ msg: "Category already exists!!" })

            const newCategory = new Category({ name });
            await newCategory.save();
            return res.status(200).json({ msg: "Category created" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const _id = req.params.id;
            await Category.findByIdAndDelete(_id);
            return res.status(200).json({ msg: "Deleted category" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const updatedName = req.body.name;
            const id = req.params.id;

            await Category.findOneAndUpdate({ _id: new ObjectId(id) }, { name: updatedName });
            //const {name} = req.body;
            //await Category.findOneAndUpdate({_id: req.params.id}, {name} );

            return res.status(200).json({ msg: "Updated category successfully!!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

}

module.exports = categoryCtrl;
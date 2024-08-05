const Category = require("../models/categoryModel");

const categoryController = {
  getCategories: async (request, response) => {
    try {
      const categories = await category.find();
      response.json(categories);
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (request, response) => {
    try {
      const { name } = request.body;
      const category = await Category.findOne({ name });
      if (category)
        return response.status(400).json({ msg: "Category Already Exists" });
      const newCategory = new Category({ name });
      await newCategory.save();
      response.json("Check Admin Success");
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (request, response) => {
    try {
      await Category.findOneAndDelete(request.params.id);
      response.json({ msg: "Deleted a category" });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryController;

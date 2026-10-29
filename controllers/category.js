const { Category, Product } = require("../models");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findOne({where: {name}});

    if (category) {
        return res.status(400).json({
          message: "Category already exists",
        });
    };

    const newCategory = await Category.create({ name });
    res.status(201).json({ message: "Category created", data: newCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.findAll();
    res.status(200).json({ message: `All categories found and the total is: ${allCategory.length}`, data: allCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id,{
        include: [{
            attributes: ['name'],
            model: Product,
            as: "Products"
        }]
     });

     if (!category) {
       return res.status(404).json({
         message: "Category not found",
       });
     }

    res.status(200).json({ message: "Category found", data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateCategory = async (req, res) => {
    
  try {
    const { name } = req.body;
    const { filterName } = req.params;
    const category = await Category.findOne({where: {name: filterName}});

    if (category) {
        const updatedCategory = await Category.update({ name }, {where: {name: filterName}});
        return res.status(200).json({ message: "Category updated", data: updatedCategory });
    }
    
    res.status(404).json({ message: "Category not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ where: { id } });

    if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
    }
    await Category.destroy({ where: {id} });
    res.status(200).json({ message: "Category deleted"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
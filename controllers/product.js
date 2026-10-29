const { Category, Product } = require("../models");

const addProduct = async (req, res) => {
  try {
    const { name, price, categoryName } = req.body;

    const category = await Category.findOne({ where: { name: categoryName } });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = await Product.findOne({ where: { name } });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = await Product.create({
      name,
      price,
      categoryId: category.id,
    });
    return res.status(201).json({ message: "Product created", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).json({
      message: `All products found and the total is: ${allProducts.length}`,
      data: allProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        {
          attributes: ["name"],
          model: Category,
          as: "Category",
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product found", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { filterName } = req.params;

    const product = await Product.findOne({ where: { name: filterName } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.update({ name, price }, { where: { name: filterName } });
    return res.status(200).json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.destroy({ where: { id } });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};

const express = require("express");
const {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/allProducts", getAllProducts);
router.get("/oneProduct/:id", getOneProduct);
router.put("/updateProduct/:filterName", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");



router.post("/addCategory", addCategory);
router.get("/allCategories", getAllCategories);
router.get("/oneCategory/:id", getOneCategory);
router.put("/updateCategory/:filterName", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;

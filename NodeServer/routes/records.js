var express = require("express");
var router = express.Router();
var recordController = require("../controllers/recordController");

router.get("/add_product", recordController.insertProduct);
router.get("/search_product", recordController.searchProduct);
router.get("/del_product", recordController.delProduct);
router.get("/edit_product", recordController.updateProduct);
module.exports = router;

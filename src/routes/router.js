const express = require("express");
const UserController = require("../controllers/userController");
const CustomerController = require("../controllers/customerController");

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/customers", CustomerController.getCustomers);

module.exports = router;
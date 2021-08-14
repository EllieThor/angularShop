const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/insertUser", usersController.insertUser);
router.post("/getUser", usersController.getUser);
// router.post("/getAllUsersFromDb", usersController.getAllUsersFromDb);

//http://www.localhost:5001/users/getUsersFromDb
//http://www.localhost:5001/users/insertUser
module.exports = router;

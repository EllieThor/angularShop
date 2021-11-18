const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/isIDExist", usersController.isIDExist);
router.post("/insertUser", usersController.insertUser);
router.post("/getUser", usersController.getUser);
router.post("/findEmail", usersController.findEmail);

// router.post("/getAllUsersFromDb", usersController.getAllUsersFromDb);

//http://www.localhost:5001/users/getUsersFromDb
//http://www.localhost:5001/users/insertUser
module.exports = router;

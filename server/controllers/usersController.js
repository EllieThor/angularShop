const Users = require("../models/usersModel");

// CREATE
exports.insertUser = async (req, res, next) => {
  let newUserOBJ = {
    ID: req.body.ID,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
    Phone: req.body.Phone,
    Street: req.body.Street,
    StreetNumber: req.body.StreetNumber,
    FlatNumber: req.body.FlatNumber,
    City: req.body.City,
  };
  // `ID`, `Role`, `FirstName`, `LastName`, `Email`, `Password`, `Phone`, `Street`, `StreetNumber`, `FlatNumber`, `City`, `createdAt`, `updatedAt`;
  // await Users.create(req.body)
  await Users.create(newUserOBJ)
    .then((user) => {
      res.send(user);
      console.log("Jane's auto-generated ID:", user.id);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.send(err);
    });
};

// // READ
exports.getUser = async (req, res, next) => {
  await Users.findAll({
    where: { Email: req.body.userEmail, Password: req.body.userPassword },
  })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
};
// // `ID`, `FirstName`, `LastName`, `Email`, `Password`, `Phone`, `Street`, `StreetNumber`, `FlatNumber`, `City`, `createdAt`, `updatedAt`;
// exports.getAllUsersFromDb = async (req, res, next) => {
//   let getByOBJ = req.body;

//   await Users.findAll({ attributes: ["FirstName", "LastName", "Email", "Phone", "Street", "StreetNumber", "FlatNumber", "City"] })
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };

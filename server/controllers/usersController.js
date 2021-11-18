const Users = require("../models/usersModel");

// READ
exports.isIDExist = async (req, res, next) => {
  const idCount = await Users.count({ where: { ID: req.body.ID } });
  await Users.count({ where: { Email: req.body.Email } })
    .then((count) => {
      res.send({ emailCount: count, IDCount: idCount });
    })
    .catch((err) => {
      res.send(err);
    });
};

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
    })
    .catch((err) => {
      res.send(err);
    });
};

// READ
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

// READ
exports.findEmail = async (req, res, next) => {
  await Users.findAll({
    where: { Email: req.body.userEmail },
  })
    .then((email) => {
      res.send(email);
    })
    .catch((err) => {
      res.send(err);
    });
};

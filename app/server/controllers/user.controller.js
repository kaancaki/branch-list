const db = require("../models");
const Branch = db.branch;
const Role = db.role;
const User = db.user;
const AdresToGeoCode = require("../api/geocode");
const geoCodeTranslate = new AdresToGeoCode();

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.branch = async (req, res) => {
  const GetBranchAll = await Branch.findAll();
  res.status(200).send(GetBranchAll);
};

exports.roleList = async (req, res) => {
  const GetRoleAll = await Role.findAll();
  res.status(200).send(GetRoleAll);
};

exports.userList = async (req, res) => {
  const GetUserList = await User.findAll();
  res.status(200).send(GetUserList);
};

exports.userDelete = async (req, res) => {
  await User.destroy({
    where: {
      id: req.body.id,
    },
    force: true,
  });

  res.status(200).send("User deleted");
};

exports.branchDelete = async (req, res) => {
  await Branch.destroy({
    where: {
      branch_code: req.body.branch_code,
    },
    force: true,
  });

  res.status(200).send("Branch deleted");
};

exports.newBranch = (req, res) => {
  console.log(req.body);
  const latitudeAndLonglitudeSplit = geoCodeTranslate
    .getGeoCode(req.body.data.full_adress)
    .then((res) => {
      const geoSplit = res.split(" ");
      return geoSplit;
    });

  const createBranch = async () => {
    const latAndLong = await latitudeAndLonglitudeSplit;
    Branch.create({
      latitude: latAndLong[1],
      longlitude: latAndLong[0],
      name: req.body.data.name,
      full_adress: req.body.data.full_adress,
      phone: req.body.data.phone,
      branch_code: req.body.data.branch_code,
    }).then((branch) =>
      res.status(200).send("Branch has been successfully added")
    ).catch((err) => res.send("An error has occurred, please check again. Make sure the branch number is unique."));
  };

  createBranch();
};

exports.updateBranch = async (req, res) => {
  const latitudeAndLonglitudeSplit = geoCodeTranslate
    .getGeoCode(req.body.data.full_adress)
    .then((res) => {
      const geoSplit = res.split(" ");
      return geoSplit;
    });

  const branchUpdate = async () => {
    const latAndLong = await latitudeAndLonglitudeSplit;
    Branch.update(
      {
        latitude: latAndLong[1],
        longlitude: latAndLong[0],
        name: req.body.data.name,
        full_adress: req.body.data.full_adress,
        phone: req.body.data.phone,
        branch_code: req.body.data.branch_code,
      },
      { returning: true, where: { id: req.body.data.id } }
    ).then((succ) =>
      res.status(200).send("Branch has been successfully update")
    ).catch((err) => res.send("An error has occurred, please check again. Make sure the branch number is unique."));
  };

  branchUpdate();
};

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", controller.allAccess);

  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get("/api/branch", [authJwt.verifyToken], controller.branch);

  app.get("/api/roles", [authJwt.verifyToken], controller.roleList);

  app.get("/api/userlist", [authJwt.verifyToken, authJwt.isAdmin], controller.userList);
  app.delete("/api/userDelete", [authJwt.verifyToken, authJwt.isAdmin], controller.userDelete)

  app.post("/api/newBranch", [authJwt.verifyToken, authJwt.isAdmin] ,controller.newBranch);
  app.delete("/api/branchDelete", [authJwt.verifyToken, authJwt.isAdmin], controller.branchDelete);
  app.patch("/api/branchUpdate", [authJwt.verifyToken, authJwt.isAdmin] ,controller.updateBranch);

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

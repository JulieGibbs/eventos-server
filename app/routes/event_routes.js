const { authJwt } = require("../middlewares");
const controller = require("../controllers/event_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/event/all", controller.eventAll);

  app.post("/api/event/add", [authJwt.verifyToken], controller.eventAdd);
  app.patch("/api/event/update/:id", [authJwt.verifyToken], controller.eventUpdate);
  app.delete("/api/event/update/:id", [authJwt.verifyToken], controller.eventDelete);
};
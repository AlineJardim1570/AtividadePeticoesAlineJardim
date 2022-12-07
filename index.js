const {app} = require("./config/server");
const routes = require("./app/routes/routes");

routes.home(app);
routes.createUser(app);
routes.loginUser(app);
routes.insertP(app);
routes.signP(app);
routes.searchPetition(app);
routes.editPetition(app);
routes.deletePetition(app);

module.exports = app;
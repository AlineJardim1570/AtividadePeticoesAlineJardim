const { home,createUser, loginUser, addP, signP, viewPetition, viewPEmail, updateP, deletePetition  } = require("../controllers/controller");

module.exports = {
    
    home: (app) => {
        app.get('/home', (req, res) => {home(app, req, res);});
        app.get('/peticoes', (req, res) => {home(app, req, res);});
    },

    createUser: (app) => {
        app.post('/user', (req, res) => {createUser(app, req, res);});
    },

    loginUser: (app) => {
        app.get('/login', (req, res) => {loginUser(app, req, res);});
    },

    insertP: (app) => {
        app.post('/peticoes', (req, res) => {addP(app, req, res);});
    },

    signP: (app) => {
        app.post('/sign/petition/id', (req, res) => {signP(app, req, res);});
    },

    searchPetition: (app) => {
        app.get('/peticoes/id/', (req, res) => {viewPetition(app, req, res);});
    },


    editPetition: (app) => {
        app.put('/peticoes/id/', (req, res) => {updateP(app, req, res);});
    },

    deletePetition: (app) => {
        app.delete('/peticoes/id/', (req, res) => {deletePetition(app, req, res);});
    },

    
}


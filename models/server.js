const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = '/api/users';
    this.clothesPath = '/api/clothes';
    this.categorysPath = '/api/categorys';
    this.authPath = '/api/auth';

    //Middlewares

    this.connectDB();

    this.middlewares();


    //Application Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }


  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'))
    this.app.use(this.usersPath, require('../routes/user.routes'))
    this.app.use(this.clothesPath, require('../routes/clothes.routes'))
    this.app.use(this.categorysPath, require('../routes/category.routes'))

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port " + this.port);
    })
  }
}

module.exports = Server;
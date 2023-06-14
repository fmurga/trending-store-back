const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');
const fileUpload = require('express-fileupload');



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = '/api/users';
    this.clothesPath = '/api/clothes';
    this.categorysPath = '/api/categorys';
    this.authPath = '/api/auth';
    this.linksPath = '/api/links';

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      clothes: '/api/clothes',
      links: '/api/links',
      users: '/api/users',
      uploads: '/api/uploads',
    }


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
    this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
  }

  routes() {

    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categories, require('../routes/category.routes'));
    this.app.use(this.paths.clothes, require('../routes/clothes.routes'));
    this.app.use(this.paths.links, require('../routes/links.routes'));
    this.app.use(this.paths.links, require('../routes/user.routes'));
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'));

  }


  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port " + this.port);
    })
  }
}

module.exports = Server;
const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');
const fileUpload = require('express-fileupload');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API Documentation using Swagger',
    },
    servers: [
      {
        url: `${process.env.API_URL}`, // Replace with your API server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Add the path to your route files
};

const specs = swaggerJsDoc(options);

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      clothes: '/api/clothes',
      links: '/api/links',
      users: '/api/users',
      uploads: '/api/uploads',
      orders: '/api/orders',
    }


    //Middlewares

    this.connectDB();

    this.middlewares();


    this.documentation();

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
    this.app.use(this.paths.users, require('../routes/user.routes'));
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    this.app.use(this.paths.orders, require('../routes/orders.routes'));
  }

  documentation() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port " + this.port);
    })
  }
}

module.exports = Server;
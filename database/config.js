const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: true,
      autoIndex: true,
    })

    console.log('Connected to database')
  } catch (error) {
    console.log(error)
    throw new Error('Could not connect to Mongo');
  }
}


module.exports = dbConnection;
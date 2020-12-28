const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/stories');
const publicationRoutes = require('./routes/publication');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
dotenv.config({ path:'./config/config.env'});


const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MOGNODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`mongo db connected sucessfully`);
});


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Medium.com apis",
        description: "API Information",
        contact: {
          name: "Developer"
        },
        servers: ["http://localhost:3000"]
      }
    },
    apis: ['./routes/user.js','./routes/publication.js','./routes/stories.js']
};
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleare to parser JSON 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//app.set('view engine','ejs');

// Route application
app.use('/api/user', userRoutes);
app.use('/api/story', blogRoutes);
app.use('/api/publication', publicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
  
// Middleare for error handling
app.use((err, req, res, next) => {
  console.log(err);
  //const errors = Object.values(err.errors).map(el => el.message);
  //const message = errors.join('. ');
  //res.status(400).send({ error: message,sucess:false });
  res.status(400).send({ error: err.message,sucess:false });
});

module.exports = app;

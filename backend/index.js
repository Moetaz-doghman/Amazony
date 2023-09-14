const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
var adminRouter = require("./router/adminRoutes");
var galleryRouter = require("./router/galleryRoutes");
var produitRouter = require("./router/produitRoutes");
var commandeRouter = require("./router/commandeRoutes");
var commentRoutes = require("./router/commentRoutes");

var configDb = require('./db.json')



const app = express()



/** middlewares */
app.use(express.json());

app.use(cors());


app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
// parse application/json
app.use(bodyParser.json())
/**end Middlewares */

const port = 8080;



/** api routes */

app.use('/admin', adminRouter);
app.use('/gallery', galleryRouter);
app.use('/produit', produitRouter);
app.use('/commande', commandeRouter );
app.use('/comment', commentRoutes );


/** end api routes */



// connect  database 
mongoose.connect(configDb.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(() => {
console.log('Connected successfully to MongoDB server');
// Perform database operations here
})
.catch((err) => console.error(err));
/** end db conn */



app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})
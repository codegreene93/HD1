const express = require('express')
const {data} = require('./data')
const config = require('./config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')

const mongodbUrl = config.MONGODB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUrl, {
      // added to avoid bugs
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected....");
  } catch (err) {
    console.error("err",err.message);
    process.exit(1);
  }
 };
 connectDB();
// mongoose.connect(mongodbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }).catch(error => console.log("error.reason"));
const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
})

/*app.get("/api/products/:id", (req, res) => {
   const productId = req.params.id;
   const product = data.products.find(x => x._id === productId);
   if (product)
     res.send(product);
   else
     res.status(404).send({ msg: "Product Not Found." })
 });*/

 //app.get("/api/products", (req, res) => {
  // res.send(data.products);
// });
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')) // relative path
  })
}

app.listen(process.env.PORT || 5000, () => { console.log("Server started at http://localhost:5000") });

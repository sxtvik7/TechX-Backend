const express = require("express");

const proRoutes = require("./routes/products_routes");
const userRoutes = require("./routes/user_routes")

const {config} = require("dotenv")


config({
  path:"./config/config.env"
})

const cors = require('cors');

const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT;

app.use(express.json())

app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000/');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use("/api/v1", proRoutes);
app.use("/api/v1/user", userRoutes)

app.listen(port, () => {
  console.log(`server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});

const express = require("express");

const proRoutes = require("./routes/products_routes");
const userRoutes = require("./routes/user_routes")
const orderRoutes = require("./routes/orders_route")

const {config} = require("dotenv")

const stripe = require("stripe")("sk_test_51QijwrHth9QdVzBq9V0QBmUB3fr1qnofCUPlShDfEj0kSU4nMXcNMq7EVomUkuSyLYfDYRQ0xp29d5FAFpOta3XD00aG21OkTS")
// (process.env.STRIPE_SECRET);


config({
  path:"./config/config.env"
})

const cors = require('cors');

const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT;

app.use(express.json())

app.use(cors({
  origin:[process.env.FRONTEND_URL, 'http://localhost:3000', "http://localhost:3002"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use("/api/v1", proRoutes);
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/order", orderRoutes)

app.listen(port, () => {
  console.log(`server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});

const { payments } = require("@paypal/checkout-server-sdk");
const conn = require("../dataBase/data.js");

const createOrder = async (req, res) => {};

module.exports = {createOrder, captureOrder}
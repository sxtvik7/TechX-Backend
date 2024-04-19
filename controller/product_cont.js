const conn = require("../dataBase/data.js");

const demo = (req, res) => {
  res.send("Hello world");
};

const getAllProducts = (req, res) => {
  conn.query("SELECT * FROM products", (err, results, fields) => {
    if (err) {
      console.error("Error Executing query: ", err);
      res.status(500).send("internal server erorr");
      return;
    }
    res.json(results);
  });
};

const getProductById = (req, res) => {
  const productId = req.params.productId;

  conn.query(
    "SELECT * FROM products WHERE id =?",
    [productId],
    (error, result, fields) => {
      if (error) {
        console.error("Error executing query: ", error);
        res.status(500).send("Internal server error");
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.status(200).json(result[0]);
    }
  );
};

module.exports = { demo, getAllProducts, getProductById };

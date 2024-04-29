const conn = require("../dataBase/data.js");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const demo = (req, res) => {
  res.send("User Routes");
};

const getAllUsers = (req, res) => {
  conn.query("SELECT * FROM users", (err, result, fields) => {
    if (err) {
      console.error("Error executing the query: ", err);
      res.status(500).send({ message: "Internal Server Error" });
      return;
    }
    res.json({ result });
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashPass = await bcrypt.hash(password, 10);
    // console.log(hashPass)

    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, result, fields) => {
        if (err) {
          console.error("Error executing query: ", err);
          res.status(500).send("Internal Server Error");
          return;
        }
        if (result.length > 0) {
          return res.status(400).json({ message: "Email already exists" });
        }

        const user = conn.query(
          "INSERT INTO users (name, email, password) VALUES (?,?,?)",
          [name, email, hashPass],
          (err, result, fields) => {
            if (err) {
              console.error("Error executing query: ", err);
              res.status(500).send("Internal Server Error");
              return;
            }
            const token = jwt.sign({ email }, process.env.JWT_SECRET);

            res
              .status(201)
              .cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
                secure: process.env.NODE_ENV === "Development" ? false : true,
              })
              .json({ message: "User Registered Successfully", token });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result, fields) => {
        if (err) {
          console.error("Error executing query: ", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];
        // console.log("Stored Password:", user.password);
        // console.log("Input Password:", password);

        const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log("Password Match:", passwordMatch);

        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
            // sameSite:"none",
            // secure: true,
          })
          .json({ message: `Welcome back ${user.name}`, token });
      }
    );
  } catch (error) {
    console.error("Error Logging user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({ message: "you've been logged out" });
};

module.exports = { demo, getAllUsers, registerUser, loginUser, logoutUser };

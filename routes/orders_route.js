const express = require("express"); 

const router = express.Router();
const stripe = require("stripe")
("sk_test_51QijwrHth9QdVzBq9V0QBmUB3fr1qnofCUPlShDfEj0kSU4nMXcNMq7EVomUkuSyLYfDYRQ0xp29d5FAFpOta3XD00aG21OkTS")
// (process.env.STRIPE_SECRET)


router.get("/", (req, res) => {
    res.send("Hello World! ORDERS")
})

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
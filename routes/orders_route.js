const express = require("express"); 
const { createOrder, captureOrder } = require("../controller/order_cont");

const router = express.Router();

// router.post('/create-order', createOrder)

// router.post("/capture-order", captureOrder)

router.post("/create-checkout-session", async(req, res) => {
    const {products} = req.body;

    const lineItems = products.map((product)=>({
        price_date:{
            currency:"usd",
            product_data:{
                name:product.name,
            },
            unit_amount: Math.round(product.price)
        },
        quantity:product.quantity
    }));
    
    const session = await Stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        // success_url:"",
        // cancle_url:""
    })
    res.json({id:session.id})
})

module.exports = router;
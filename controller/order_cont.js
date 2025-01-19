const { payments } = require("@paypal/checkout-server-sdk");
const conn = require("../dataBase/data.js");

const createOrder = async (req, res) => {
    const {products} = req.body;

    const lineItems = products.map((product)=>({
        price_date:{
            currency:"usd",
            product_data:{
                name:product.name,
            },
            unit_amount:product.price
        },
        quantity:product.quantity
    }))

    const session = await Stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        // success_url:"",
        // cancle_url:""
    })

    res.json({id:session.id})
};

const captureOrder = async (req, res) => {
    const { orderID } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        res.json(capture);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


module.exports = {createOrder, captureOrder}
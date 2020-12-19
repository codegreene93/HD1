import express from 'express';
import Order from '../models/orderModel';
import {isAuth} from '../util';

const router = express.Router();

//create a route for the order OrderScreen
  router.get("/:id", isAuth, async(req,res) =>{
    const order = await Order.findOne({_id: req.params.id});
    if(order){
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  })

  //create a new order
router.post("/" , isAuth, async(req,res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.payment,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  })
  //save the new order created
  const newOrderCreated = await newOrder.save();
  res.status(201).send({message: "new order created", data: newOrderCreated});
})

export default router;

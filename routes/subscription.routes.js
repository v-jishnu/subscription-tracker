import { Router } from "express";    
import { createSubscription , getSubscriptions } from "../controllers/subscriptions";
import authorize from "../middlewears/auth.middlewear.js";
const subscriptionRouter = Router();


// get all subscriptions
subscriptionRouter.get("/", authorize ,getSubscriptions );

// get a subscription by id
subscriptionRouter.get("/:id", (req, res) => {
  res.send("User route is working!");
});

// create a subscription
subscriptionRouter.post("/", authorize ,createSubscription);

// update a subscription by id
subscriptionRouter.put("/:id", (req, res) => {
  res.send("User route is working!");
});

// delete a subscription by id
subscriptionRouter.delete("/:id", (req, res) => {
  res.send("User route is working!");
});

// get all subscriptions for a user
subscriptionRouter.get("/user/:userId", (req, res) => {
  res.send("User route is working!");
});

//cancel a subscription by id
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send("User route is working!");
});

//upcomming renewals for a user

export default subscriptionRouter;
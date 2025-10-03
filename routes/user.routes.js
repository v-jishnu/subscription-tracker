import { Router } from "express";
const userRouter = Router();
import { getUsers, getUserById } from "../controllers/user.js";
import authorize from "../middlewears/auth.middlewear.js";

// get all users
userRouter.get("/",authorize,getUsers);

// get a user by id
userRouter.get("/:id", authorize ,getUserById);

// create a user
userRouter.post("/", (req, res) => {
  res.send("User route is working!");
});

// update a user by id
userRouter.put("/:id", (req, res) => {
  res.send("User route is working!");
});

// delete a user by id
userRouter.delete("/:id", (req, res) => {
  res.send("User route is working!");
});

export default userRouter;

import { Router } from "express";
const authRouter = Router();
import { register , login } from "../controllers/auth.js";

authRouter.post("/login", login);

authRouter.post("/signUp", register);     

authRouter.post("/signOut", (req, res) => {
  // Handle user logout
  res.send("User logged out");
});

export default authRouter;
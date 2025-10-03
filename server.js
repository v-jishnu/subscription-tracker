import express from 'express';
import './config.js';
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './mongoDB/connect.db.js';
import arcjetMiddleware from './middlewears/arcjet.middlewear.js';

const app = express();

app.use(express.json());
//app.use(cookieParser());
app.use(arcjetMiddleware);

//routing middleware
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.get('/', (req, res) => {
    res.send('welcome to Subscription Tracker API');
});

app.listen( process.env.PORT, async() =>{
    console.log(`Server is running on port ${process.env.PORT}`);

    await connectDB();
});

export default app;


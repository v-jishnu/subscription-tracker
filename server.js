import express from 'express';
import './config.js';
import subscritorRoutes from './routes/subscriberRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
import authRoutes from './routes/auth.routes.js';
import connectDB from './mongoDB/connect.db.js';

const app = express();

app.use(express.json());

//routing middleware
app.use("/api/v1/subsciptions", subscritorRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('welcome to Subscription Tracker API');
});

app.listen( process.env.PORT, async() =>{
    console.log(`Server is running on port ${process.env.PORT}`);

    await connectDB();
});

export default app;


import express from "express";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"


import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";


import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import notificationRoutes from "./routes/notification.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use(arcjetMiddleware);



app.get('/', (req, res)=>{
    res.send("center")
})

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes);

app.use("/api/notifications", notificationRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.use((err, req, res, next) => {
    console.error("Unhandled error: ", err);
    res.status(500).json({error: err.message || "Internal server error"})
})

const startServer = async () => {
    try {
        await connectDB();
        if(ENV.NODE_ENV!="production"){
            app.listen(ENV.PORT, ()=>{
            console.log("Server running on port: ", ENV.PORT);
        })
        }
    } catch (error) {
        console.log("Failed to start server:", error.message);
        process.exit(1);
    }
};
startServer();

export default app;
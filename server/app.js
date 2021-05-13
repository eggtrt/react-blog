import express from 'express';
import mongoose from 'mongoose';
import config from './config';

const app = express()
const { MONGO_URI } = config;

// 보안
app.use(hpp());
app.use(helmet());

// 환경
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

// Body parser 역할
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
}).then(() => console.log("Mongo DB connect"))
.catch((e) => console.error(e));

// Use routes
app.all("*", (req, res, next) => {
    let protocol = req.headers["x-forward-proto"] || req.protocol;
    if (protocol === "https") {
      next();
    } else {
      let to = `https://${req.hostname}${req.url}`;
      res.redirect(to);
    }
  });
  
  app.use("/api/post", postRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/search", searchRoutes);

export default app;
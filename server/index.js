import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postsRouter from "./routes/postsRouter.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(cors());

app.use("/posts", postsRouter);

app.use(errorHandler);

const CONNECTION_URL =
  "mongodb+srv://irem:iremOltaDBpass@cluster0.42jxt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Connected to database");
      console.log(`Server running on port ${PORT}`);
    })
  )

  .catch((err) => console.log("Error: ", err.message));

//mongoose.set("useFindAndModify", false);

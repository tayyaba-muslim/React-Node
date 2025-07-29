// import dotenv from "dotenv"
// import express from "express"
// import router from "./routes/route.mjs"
// import mongoose from "mongoose"
// import cors from "cors"


// const app = express()
// //body parser
// app.use(express.json())
// app.use(cors())
// dotenv.config()
// const port = process.env.PORT


// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_CONNECTION_URL);
//   console.log("db connected")
// }


// app.use("/",router)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routes/route.mjs";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// body parser
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    console.log("db connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const app = express();
const connectToMongo = require("./database");
const cors = require("cors");
const port = 5000 || process.env.PORT;
const auth = require("./routes/auth");
const notes = require("./routes/notes");
app.use(cors());
app.use(express.json());
app.use("/api/notes", notes);
app.use("/api/auth", auth);
// app.use("/", (req, res) => {
//   res.send("ROOT");
// });
app.listen(port, () => {
  console.log(`iNotebook backend listening at ${port} `);
});
connectToMongo();

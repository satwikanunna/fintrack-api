const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const auth = require("./middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.get("/protected", auth, (req, res) => {
  res.json({ message: "You accessed protected route!" });
});

app.get("/", (req, res) => {
  res.send("FinTrack API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
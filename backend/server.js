const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const Timer = require("./models/Timer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const getForkTimestamp = async () => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/forks`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    console.log("GitHub Response:", response.data); // Log GitHub API response
    return response.data[1].created_at; // Assuming the first fork's created_at is the one you need
  } catch (error) {
    console.error("Error fetching fork time", error);
    throw new Error("Error fetching fork time");
  }
};

app.post("/api/timer/start", async (req, res) => {
  try {
    const startTime = await getForkTimestamp(); // Fetch the timestamp from GitHub
    const timer = new Timer({ start_time: new Date(startTime) });
    await timer.save();
    res.json({ timerId: timer._id, start_time: timer.start_time });
  } catch (error) {
    console.error("Error starting the timer:", error);
    res.status(500).json({ message: "Error starting timer" });
  }
});

app.post("/api/timer/end/:id", async (req, res) => {
  const { id } = req.params;
  const endTime = new Date(); 
  try {
  
    const timer = await Timer.findById(id);
    if (!timer) {
      return res.status(404).json({ message: "Timer not found" });
    }

    const timeElapsed = Math.abs(endTime - new Date(timer.start_time)) / 1000; 


    timer.end_time = endTime;
    timer.total_time = timeElapsed;

    await timer.save();

    
    res.json({ total_time: timeElapsed, end_time: timer.end_time });
  } catch (error) {
    console.error("Error ending the timer:", error);
    res.status(500).json({ message: "Error ending timer" });
  }
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST",
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

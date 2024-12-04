require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParses = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParer.json());

mongoose
   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("MongoDB connection error:", err));

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);

app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: "Error fetching items" });
    }
});

app.post("/api/items", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: "Error creating item" });
    }
});

app.delete("/api/items/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: "Error deleting item "});
    }
});

app.listen(PORT, () => console.log('Server running on port ${PORT}'));
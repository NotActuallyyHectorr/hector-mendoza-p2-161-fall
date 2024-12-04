const express = require("express");
const Item = require("../models/Item");
const router = express.Router();

router.get("/", async (req, res) => {
  const { search, sort } = req.query;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  try {
    const items = await Item.find(query).sort(sort ? { name: sort === "asc" ? 1 : -1 } : {});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});


router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Error creating item" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: "Error deleting item" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: "Error updating item" });
  }
});


module.exports = router;
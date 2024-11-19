const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");
const middleware = require("../middleware");

// Get all items
router.get("/", (req, res, next) => {
  try {
    return res.json({ items });
  } catch (e) {
    next(e);
  }
});

// Add a new item
router.post("/", middleware.checkItem, (req, res, next) => {
  try {
    const { name, price } = req.body;
    const item = { name, price };
    items.push(item);
    return res.status(201).json({ added: item });
  } catch (e) {
    next(e);
  }
});

// Get a single item
router.get("/:name", (req, res, next) => {
  try {
    const item = items.find(u => u.name === req.params.name);
    if (!item) {
      throw new ExpressError(`Item with name '${req.params.name}' not found`, 404);
    }
    return res.json(item);
  } catch (e) {
    next(e);
  }
});

// Update an item
router.patch("/:name", middleware.checkItem, (req, res, next) => {
  try {
    const item = items.find(u => u.name === req.params.name);
    if (!item) {
      throw new ExpressError(`Item with name '${req.params.name}' not found`, 404);
    }
    const { name, price } = req.body;
    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price;
    return res.json({ updated: item });
  } catch (e) {
    next(e);
  }
});

// Delete an item
router.delete("/:name", (req, res, next) => {
  try {
    const itemIndex = items.findIndex(u => u.name === req.params.name);
    if (itemIndex === -1) {
      throw new ExpressError(`Item with name '${req.params.name}' not found`, 404);
    }
    items.splice(itemIndex, 1);
    return res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

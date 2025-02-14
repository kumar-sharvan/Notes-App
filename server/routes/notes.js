// routes/notes.js
const express = require("express");
const auth = require("../middleware/auth");
const Note = require("../models/Note");

const router = express.Router();

router.post("/add", auth, async (req, res) => {
  const { title, content } = req.body;
  console.log("Request to add note:", { title, content });
  try {
    const newNote = new Note({
      title,
      content,
      userId: req.user.id,
    });
    const note = await newNote.save();
    console.log("Note saved:", note);
    res.json(note);
  } catch (err) {
    console.error("Error saving note:", err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err.message);
    res.status(500).send("Server error");
  }
});

router.put("/update/:id", auth, async (req, res) => {
  const { title, content } = req.body;
  console.log("Request to update note:", {
    title,
    content,
    userId: req.user.id,
  });
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      console.log("Note not found");
      return res.status(404).json({ msg: "Note not found" });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.error("Error updating note:", err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      console.log("Note not found");
      return res.status(404).json({ msg: "Note not found" });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error("Error deleting note:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

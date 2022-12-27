const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUsers");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const helloTiger = require("../middleware/syed");

// Get all the notes. Login required
router.post("/fetchAllNotes", fetchUser, helloTiger, async (req, res) => {
  try {
    console.log(req.user);
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal server error");
  }
});

// Add a new note. Login required
router.post(
  "/addNote",
  [
    body(
      "title",
      "Enter a Valid title(should be greater than 3 characters)"
    ).isLength({ min: 3 }),
    body(
      "description",
      "Enter a Valid description (Should be greater then 5 characters)"
    ).isLength({ min: 5 }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      console.log("in ADD");
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("DOWN");
      console.log(req.user.id);
      console.log(tag + "tagg");
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      return res.json({ savedNotes });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

//updates an existing node

router.put("/updateNotes/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new  notes obect
    console.log(title);
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error.message);
  }
});

//delete Node
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  //find the note
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //allow deletion only after authentication
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not Allowed");
    }
    await Notes.findByIdAndDelete(req.params.id);
    return res.status(201).json({ Sucess: " note has been deleted", note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;

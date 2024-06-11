const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

const { body, validationResult } = require("express-validator");

// Route 1
//  get all notes using GET  endpoint: "/api/notes/fetchllnotes".  Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error occured" });
  }
});

// Route 2
// Add a new note using POST  endpoint: "/api/notes/addnote".  Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if ther are errors return Bad Request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server error occured" });
    }
  }
);

// Route 3
//  uodate a note using PUT  endpoint: "/api/notes/updatenote/:id".  Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {


    try {
        const { title, description, tag } = req.body;

        // create a newnote object
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
      
        // Find note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
          return res.status(404).send("Not found");
        }
      
        // user should only access to his notes
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
        }
        //  change the note in database to newNote
        note = await Note.findByIdAndUpdate(
          req.params.id,
          { $set: newNote },
          { new: true }
        );
        res.json({ note });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server error occured" });
      }
 
});

// Route 4
//  delete a note using DELETE  endpoint: "/api/notes/deletenote".  Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // Verify if the note a person is deleting is his
try {
     // Find note to be deleted and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }

  // Allow deletion only if the user owns it
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  //  delete the note
  note = await Note.findByIdAndDelete(req.params.id);

  res.json({ Success: "Note has been deleted", note: note });
    
} catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error occured" });
  }
 
});

module.exports = router;

const mongoose = require("mongoose");
const { Schema } = mongoose;
// mongoose.set("strictQuery", true);
const NotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "userdetails",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Notesmodel = mongoose.model("notesmodel2", NotesSchema);
module.exports = Notesmodel;

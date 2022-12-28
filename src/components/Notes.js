import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { AddNote } from "./AddNote";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  console.log(notes);
  console.log("below notes");
  return (
    <div>
      <AddNote />
      <div className="row my-3">
        <h4>Your Notes</h4>
        {notes.map((el, index) => {
          return <Noteitem key={index} note={el} />;
        })}
      </div>
    </div>
  );
};
export default Notes;

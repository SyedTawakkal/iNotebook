// import React, { useState } from "react";
import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const [state, setState] = useState("");
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);
  //  Get All Notes
  const getNotes = async (title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQ2ZWI0OTQ1NDhkOGM4MmU2MDRlZiIsImlhdCI6MTY3MjMxMDQ2OCwiZXhwIjoxNjcyMzE0MDY4fQ.-DrpHJsinm1XUww-rEcFxkMeJ4_NH6BYeEWuk8GOd84",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  //  add a Note
  const addNote = async (title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQ2ZWI0OTQ1NDhkOGM4MmU2MDRlZiIsImlhdCI6MTY3MjMxMDQ2OCwiZXhwIjoxNjcyMzE0MDY4fQ.-DrpHJsinm1XUww-rEcFxkMeJ4_NH6BYeEWuk8GOd84",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    console.log("below note here");
    //check for object here different from harrys code
    console.log(note.savedNotes);
    const updatedNotes = notes.concat(note.savedNotes);
    setNotes(updatedNotes);
  };
  // delete a Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQ2ZWI0OTQ1NDhkOGM4MmU2MDRlZiIsImlhdCI6MTY3MjMxMDQ2OCwiZXhwIjoxNjcyMzE0MDY4fQ.-DrpHJsinm1XUww-rEcFxkMeJ4_NH6BYeEWuk8GOd84",
      },
    });
    const json = response.json();
    console.log(json);
    console.log(`deleting the note ${id}`);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(
      `${host}/api/notes/updateNotes/63ac2597d5bcf90766a51f24`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWMxMTU4YTBjM2FhNjMwNmNlYzI4OCIsImlhdCI6MTY3MjIyNjE3NCwiZXhwIjoxNjcyMjI5Nzc0fQ.-jteJQz433GnWT-b5p9KyulPN4VwIxAdbWEqdj-pzYo",
        },
        body: JSON.stringify(title, description, tag),
      }
    );
    // const json = response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

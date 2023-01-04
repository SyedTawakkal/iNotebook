// import React, { useState } from "react";
import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjU2MzYxODJlMDU3YzFjMTFkMWNkNiIsImlhdCI6MTY3MjgzMTg2OCwiZXhwIjoxNjcyODM1NDY4fQ.v_Ha7cACUa4_BvI1jtwhg8Hv4EWyWR-qTsVrwDNe2jk";
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjU3MWU2NDFmZjM1NjRjY2RkYTIyMyIsImlhdCI6MTY3MjgzNTU4MiwiZXhwIjoxNjcyODM5MTgyfQ.fmAjeLltEJTWk8oV0plIJf2j6WyDmRDcatV1m6xECr8",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  //  add a Note
  const addNote = async (title, description, tag) => {
    // API CALL
    try {
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjU3MWU2NDFmZjM1NjRjY2RkYTIyMyIsImlhdCI6MTY3MjgzNTU4MiwiZXhwIjoxNjcyODM5MTgyfQ.fmAjeLltEJTWk8oV0plIJf2j6WyDmRDcatV1m6xECr8",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
      console.log("below note here");
      //check for object here different from harrys code
      console.log(note.savedNotes);
      const updatedNotes = notes.concat(note.savedNotes);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error.message);
    }
  };
  // delete a Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjU3MWU2NDFmZjM1NjRjY2RkYTIyMyIsImlhdCI6MTY3MjgzNTU4MiwiZXhwIjoxNjcyODM5MTgyfQ.fmAjeLltEJTWk8oV0plIJf2j6WyDmRDcatV1m6xECr8",
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
    try {
      console.log("Above edit fetch");
      console.log(id);
      // API CALL
      const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjU3MWU2NDFmZjM1NjRjY2RkYTIyMyIsImlhdCI6MTY3MjgzNTU4MiwiZXhwIjoxNjcyODM5MTgyfQ.fmAjeLltEJTWk8oV0plIJf2j6WyDmRDcatV1m6xECr8",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      console.log(response);
      const json = await response.json();
      console.log("req sent");
      console.log(json);
      let newNotes = JSON.parse(JSON.stringify(notes));
      // const json = response.json();
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.log(error.message);
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

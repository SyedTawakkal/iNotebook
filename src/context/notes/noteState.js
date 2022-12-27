// import React, { useState } from "react";
import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const [state, setState] = useState("");
  const notesinitial = [
    {
      _id: "63a52699b3ce7d15258672e8",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-5",
      description: "Eye of the tiger for sure...6",
      tag: "Important very very very-6",
      date: "2022-12-23T03:55:05.121Z",
      __v: 0,
    },
    {
      _id: "63a541afb3ce7d15258672ed",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-8",
      description: "Eye of the tiger for sure...7",
      tag: "Important very very very-7",
      date: "2022-12-23T05:50:39.502Z",
      __v: 0,
    },
    {
      _id: "63a52699b3ce7d15258672e8",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-5",
      description: "Eye of the tiger for sure...6",
      tag: "Important very very very-6",
      date: "2022-12-23T03:55:05.121Z",
      __v: 0,
    },
    {
      _id: "63a541afb3ce7d15258672ed",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-8",
      description: "Eye of the tiger for sure...7",
      tag: "Important very very very-7",
      date: "2022-12-23T05:50:39.502Z",
      __v: 0,
    },
    {
      _id: "63a52699b3ce7d15258672e8",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-5",
      description: "Eye of the tiger for sure...6",
      tag: "Important very very very-6",
      date: "2022-12-23T03:55:05.121Z",
      __v: 0,
    },
    {
      _id: "63a541afb3ce7d15258672ed",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-8",
      description: "Eye of the tiger for sure...7",
      tag: "Important very very very-7",
      date: "2022-12-23T05:50:39.502Z",
      __v: 0,
    },
    {
      _id: "63a52699b3ce7d15258672e8",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-5",
      description: "Eye of the tiger for sure...6",
      tag: "Important very very very-6",
      date: "2022-12-23T03:55:05.121Z",
      __v: 0,
    },
    {
      _id: "63a541afb3ce7d15258672ed",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-8",
      description: "Eye of the tiger for sure...7",
      tag: "Important very very very-7",
      date: "2022-12-23T05:50:39.502Z",
      __v: 0,
    },
    {
      _id: "63a52699b3ce7d15258672e8",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-5",
      description: "Eye of the tiger for sure...6",
      tag: "Important very very very-6",
      date: "2022-12-23T03:55:05.121Z",
      __v: 0,
    },
    {
      _id: "63a541afb3ce7d15258672ed",
      user: "63a5261ab3ce7d15258672e4",
      title: "Learn react bro fast now-8",
      description: "Eye of the tiger for sure...7",
      tag: "Important very very very-7",
      date: "2022-12-23T05:50:39.502Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesinitial);
  //  add a Note
  const addNote = (title, description, tag) => {
    const note = {
      _id: "63a541afb3ce7d15258672ed",
      user: "63a5261ab3ce7d15258672e4",
      title: title,
      description: description,
      tag: tag,
      date: "2022-12-23T05:50:39.502Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // delete a Note
  const deleteNote = (id) => {};
  // edit a note
  const editNote = (id) => {};
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

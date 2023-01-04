import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import noteContext from "../context/notes/noteContext";

const customCss = {
  cursor: "pointer",
};

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <FontAwesomeIcon
            icon={faTrash}
            className="mx-2"
            style={customCss}
            onClick={() => {
              deleteNote(note._id);
            }}
          />
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="mx-2"
            style={customCss}
            onClick={() => {
              updateNote(note);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

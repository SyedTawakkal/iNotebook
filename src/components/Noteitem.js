import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const customCss = {
  cursor: "pointer",
};

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fuga voluptates soluta ratione blanditiis ad est,
            minus unde cum aliquid temporibus asperiores consequatur
            consequuntur rerum, tempore veniam ipsum quod! Cum, quaerat.{" "}
          </p>
          <FontAwesomeIcon icon={faTrash} className="mx-2" style={customCss} />
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="mx-2"
            style={customCss}
          />
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

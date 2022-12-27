import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const a = useContext(noteContext);
  console.log(a);
  useEffect(() => {}, []);
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>This is About</h2>
    </div>
  );
};

export default About;

import { React, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { note, updatenote } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">
              <p>{note.description}</p>
            </p>
            <p className="card-text">
              <p>{note.tag}</p>
            </p>
            <a
              href="#"
              className="btn btn-danger" onClick={() => {
                deleteNote(note._id);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </a>
            <a href="#" className="btn btn-primary mx-3 " onClick={()=>{updatenote(note)}}>
              <i className="fa-solid fa-pen-to-square"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;

import { React, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { note, updatenote, showAlert } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <>
      
      <div className="col-md-3">
        <div className="card my-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-truncate">{note.title}</h5>
            <p className="card-text text-muted">{note.description}</p>
            <p className="card-text">
              <span className="badge bg-secondary">{note.tag}</span>
            </p>
            <div className="d-flex justify-content-between">
              <a
                href="#"
                className="btn btn-danger"
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("Successfully deleted note", "success");
                }}
                title="Delete"
              >
                <i className="fa-solid fa-trash"></i>
              </a>
              <a
                href="#"
                className="btn btn-primary"
                onClick={() => {
                  updatenote(note);
                }}
                title="Edit"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;

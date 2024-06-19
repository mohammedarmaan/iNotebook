import { React, useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = ({ showAlert }) => {
  const context = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" }); // REMOVE TAG FROM HERE AND U GET DEFAULT AS "GENERAL" WHICH IS HOW IT IS ON MODELS
  const { addNote } = context;

  const handleClick = (e) => {
    e.preventDefault();
    if (note.title.length < 3 || note.description.length < 5) {
      showAlert(
        "Title must be at least 3 characters and description at least 5 characters.",
        "danger"
      );
      return;
    }
    addNote(note.title, note.description, note.tag || "general"); // Default tag as "general" if empty
    setNote({ title: "", description: "", tag: "" });
    showAlert("Successfully added note", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
  
    <div className="container my-5 p-4 bg-light shadow rounded">
      <h2 className="mb-4">Add Your Note</h2>
      <form onSubmit={handleClick}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
              value={note.title}
              
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              onChange={onChange}
              value={note.description}
              
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="tag" className="form-label">
              Tag:
            </label>
            <input
              type="text"
              name="tag"
              id="tag"
              className="form-control"
              onChange={onChange}
              value={note.tag}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;

import {React, useContext, useState} from "react";
import noteContext from '../context/notes/noteContext'

const Addnote = ({showAlert}) => {
    const context = useContext(noteContext)
    const [note, setNote] = useState({title: "", description: "", tag: ""}) // REMOVE TAG FROM HERE AND U GET DEFAULT AS "GENERAL" WHICH IS HOW IT IS ON MODELS
    const {addNote} = context;

    const handleClick = (e) => {
      e.preventDefault();
      if (note.title.length < 3 || note.description.length < 5) {
          showAlert("Title must be at least 3 characters and description at least 5 characters.", "danger");
          return;
      }
      addNote(note.title, note.description, note.tag || "general"); // Default tag as "general" if empty
      setNote({ title: "", description: "", tag: "" });
      showAlert("Successfully added note", "success");
  }

    const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value});

    }
    

  return (
    <div className="container my-5">
      <h2>Add your note</h2>
      <form>
        <div className="row">
        <div className="mb-3 col-md-6">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <br/>
          <input
            type="text"
            name="title"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            required
            minLength={3}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="description" className="form-label">
            description:
          </label>
          <br/>
          <input
            type="text"
            name="description"
            id="desc"
            onChange={onChange}
            value={note.description}
            required
            minLength={5}
          />
          <br/>
          <label htmlFor="tag" className="form-label">
            tag:
          </label>
          <br/>
          <input
            type="text"
            name="tag"
            id="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
         Add note
        </button>
      </form>
    </div>
  );
};

export default Addnote;

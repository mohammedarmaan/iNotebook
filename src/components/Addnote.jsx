import {React, useContext, useState} from "react";
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
    const context = useContext(noteContext)
    const [note, setNote] = useState({title: "", description: "", tag: ""}) // REMOVE TAG FROM HERE AND U GET DEFAULT AS "GENERAL" WHICH IS HOW IT IS ON MODELS
    const {addNote} = context;

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})

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
            minLength={3}
            value={note.title}
            requiured
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
            minLength={5}
            value={note.description}
            requiured
          />
          <br/>
          <label htmlFor="description" className="form-label">
            tag:
          </label>
          <br/>
          <input
            type="text"
            name="tag"
            id="tag"
            onChange={onChange}
            value={note.tag}
            requiured
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

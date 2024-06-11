import { React, useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [note, setNote] = useState({etitle: "", edescription: "", etag: ""}) // REMOVE TAG FROM HERE AND U GET DEFAULT AS "GENERAL" WHICH IS HOW IT IS ON MODELS
   
  const ref = useRef(null)

  useEffect(() => {
    getNotes();
  }, []);

  const updatenote = (currentnote) => {
    ref.current.click()
    setNote({etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
  };


  const handleClick = (e) => {
    setNote(note)
    e.preventDefault();
    

}

const onChange = (e) => {
  setNote({...note, [e.target.name]: e.target.value});

}

  return (
    <>
      <Addnote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
       
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">

            <form>
        <div className="row">
        <div className="mb-3 col-md-6">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <br/>
          <input
            type="text"
            name="etitle"
            id="etitle"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.etitle}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="description" className="form-label">
            description:
          </label>
          <br/>
          <input
            type="text"
            name="edescription"
            id="edesc"
            onChange={onChange}
            value={note.edescription}
          />
          <br />
          <label htmlFor="tag" className="form-label">
            tag:
          </label>
          <br/>
          <input
            type="text"
            name="etag"
            id="etag"
            onChange={onChange}
            value={note.etag}
          />
        </div>
        </div>
        
      </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <h2>Your notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updatenote={updatenote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;

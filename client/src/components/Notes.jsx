import { React, useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = ({ showAlert }) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  }); // REMOVE TAG FROM HERE AND U GET DEFAULT AS "GENERAL" WHICH IS HOW IT IS ON MODELS

  const ref = useRef(null);
  const refclose = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/signin");
    }
  }, []);

  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    e.preventDefault();
    ref.current.click();

    showAlert("Successfully edited note", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={showAlert} />

      {/* <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <br />
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
                    <br />
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
                    <br />
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                ref={refclose}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>





      <div className="container row my-5">
        <h2>Your notes</h2>
        <div className="container">{notes.length === 0 && "No notes  "}</div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updatenote={updatenote} showAlert={showAlert}/>
          );
        })}
      </div> */}

      <div className="container my-5">
        {/* Modal Trigger */}
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      name="etitle"
                      id="etitle"
                      className="form-control"
                      onChange={onChange}
                      value={note.etitle}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description:
                    </label>
                    <input
                      type="text"
                      name="edescription"
                      id="edesc"
                      className="form-control"
                      onChange={onChange}
                      value={note.edescription}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag:
                    </label>
                    <input
                      type="text"
                      name="etag"
                      id="etag"
                      className="form-control"
                      onChange={onChange}
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                  ref={refclose}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes List */}
        <div className="container">
          <h2 className="mb-4">Your Notes</h2>
          {notes.length === 0 ? (
            <div className="alert alert-info">No notes to display</div>
          ) : (
            <div className="row">
              {notes.map((note) => (
                <Noteitem
                  key={note._id}
                  note={note}
                  updatenote={updatenote}
                  showAlert={showAlert}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;

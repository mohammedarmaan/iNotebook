import React, { useState } from "react";
import NoteContext from "./noteContext";
import Alert from "../../components/Alert";

const NoteState = (props) => {
  const notesinitial = [];

  const [notes, setNotes] = useState(notesinitial);

  // Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(
      `http://localhost:5000/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {

    //API call
    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    console.log("adding a note");
    const note = {
      _id: json._id,
      // user: "6651dcf78ea7b212f5219cf8",
      user: json.user,
      title: title,
      description: description,
      tag: tag,
      date: "2024-06-02T06:14:35.615Z",
      __v: 0,
    };
    setNotes(notes.concat(note)); // concat returns an array
    
    
  };

  // Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(
      `http://localhost:5000/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      }
    );
    const json = response.json();
    console.log(json);

    //Client side delete
    // console.log("deleted note: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },

        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = response.json();
    console.log(json);

    let newnotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client side
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id == id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
      break;
      }
    }
    setNotes(newnotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

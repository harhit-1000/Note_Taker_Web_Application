import noteContext from "./noteContext";
import React, { useState } from 'react'

const NoteState = (props) => {

    const host = "http://localhost:4000";

    let notesInitials = [];

    const [notes, setNotes] = useState(notesInitials)

    // fetch all notes a note
    const getNotes = async (title, description, tag) => {
        // API logic 
        const response = await fetch(`${host}/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
          const json = await response.json();
          setNotes(json);
          
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // API logic 
        const response = await fetch(`${host}/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          });
            const json = response.json();
            console.log(json);

    }

    // Update a note
    const editNote = async (id,title,description,tag) => {
        //API Logic
        const response = await fetch(`${host}/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          });
            const json = response.json();
            console.log(json);

        //Client Logic
          getNotes();
    }

    // Delete a note
    const deleteNote = async (id) => {
        // API Logic 
        const response = await fetch(`${host}/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
            const json = response.json();
            console.log(json);  
            
            // Client Site deletion 
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }

    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
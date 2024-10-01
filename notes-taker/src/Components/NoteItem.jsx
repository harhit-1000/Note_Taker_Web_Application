import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'

export const NoteItem = (props) => {

  const {note,updateNote} = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <>
    <div className="card d-inline-block text-start my-2 mx-2 bg-shadow" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <button className="btn-sm tag-btn btn-primary">{note.tag}</button>
      </div>
      <button className="fa-regular fa-pen-to-square fa-lg my-3 mx-2 "style={{ border: "0px" }} onClick={() => { updateNote(note) }}></button>
      <button className="fa-solid fa-trash fa-lg my-3 mx-2" style={{ border: "0px" }} onClick={() => { deleteNote(props.note._id); props.showAlert("Note Deleted.","danger") ; }}></button>
    </div>
    </>
  )
}

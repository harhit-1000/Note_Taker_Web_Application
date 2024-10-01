import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext'

export const AddNote = (props) => {

    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added", "info")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className='location-c'>
            <div className='inbox'>
                <h2 className='my-2'>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.title} id="title" name="title" onChange={onChange} />
                        <div id="titleHelp" className="form-text">Please Provide a title to your notes</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea type="text" className="form-control" value={note.description} id="description" name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3 text-center">
                        <label className="form-label">Tag</label>
                        <input type="text" className="form mx-5" value={note.tag} id="tag" name='tag' onChange={onChange} />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary" onClick={handleClick}><i className="fa-solid fa-plus"></i> Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

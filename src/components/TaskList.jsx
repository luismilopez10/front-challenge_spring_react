import React, { useContext, useEffect } from 'react'
import { Store } from '../state_manager/StoreProvider'
import { BiTrashAlt } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'
import TaskForm from './TaskForm'

const TaskList = ({setMessage, setUpdate, setNote}) => {

    const {state, dispatch} = useContext(Store)

    useEffect(()=>{
        fetchAllNotes()
        .then(notes=>{
            let action = {
                type: 'get-notes',
                payload: notes
            };

            dispatch(action);
        })
    }, [])

    const fetchAllNotes = async() => {
        return await fetch(`http://localhost:8081/api/v1/notes`)
        .then(response => response.json());
    }

    const onCheckbox = async (event, note) => {
        const checked = event.currentTarget.checked;
        
        const noteWithCheckboxInfo = {...note, done: checked}

        const requestOptions = {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(noteWithCheckboxInfo)
        }

        fetch(`http://localhost:8081/api/v1/notes`, requestOptions)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'update-note',
                    payload: data.notes.filter(data => data.id === note.id)[0]
                });
            });  
    }

    const onDelete = async (note) => {
        let response = await fetch(`http://localhost:8081/api/v1/notes/${note.id}`,
        {
            method: 'DELETE'
        });

        if (response.status === 200) {
            dispatch({
                type: 'remove-note',
                payload: note
            });
        }; 
    }

    return (
        <div>
            <ul>
                {state.lstNotes.map(note => {
                    return (
                        <li key={note.id} className='task' style={note.done ? {textDecoration: 'line-through'} : {}}>
                        <h2>
                            <span>
                                {/* {note.id} */}
                                <span> </span>
                                <FaRegEdit onClick={() => {
                                    setMessage(note.message);
                                    setUpdate(true);
                                    setNoteId(note);
                                    }
                                } />
                            </span>
                            
                            <BiTrashAlt onClick={() => onDelete(note)} />
                        </h2>
                        <h2>
                            {note.message}
                            <input className='form-control-check' onChange={(event) => onCheckbox(event, note)} type="checkbox" checked={note.done} />              
                        </h2>                 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TaskList
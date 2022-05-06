import React, { useContext, useEffect } from 'react'
import { Store } from '../state_manager/StoreProvider'
import { BiTrashAlt } from 'react-icons/bi'

const TaskList = () => {

    const {state, dispatch} = useContext(Store)

    useEffect(()=>{
        let listOfNote = fetchAllNotes()
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
                    payload: data
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
            <h1>Your tasks</h1>
            <ul>
                {state.lstNotes.map(note => {
                    return (
                    <li key={note.id} className='task' style={note.done ? {textDecoration: 'line-through'} : {}}>
                        <h3>
                            {note.title}
                            <BiTrashAlt onClick={() => onDelete(note)} />
                        </h3>
                        <h5>
                            {note.message}
                            <input className='form-control-check' onChange={(ev) => onCheckbox(ev, note)} type="checkbox" checked={note.done} />
                        </h5>                    
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TaskList
import React, { useContext, useState, useRef } from 'react'
import { Store } from '../state_manager/StoreProvider'
import TaskList from './TaskList'


const TaskForm = () => {

    const formRef = useRef(null);
    
    const {state, dispatch} = useContext(Store);
    
    const [note, setNote] = useState(0);
    
    const [update, setUpdate] = useState(false);

    const [message, setMessage] = useState('');

    const addingMessage = (event) => {
        setMessage(event.target.value);
    }

    const onAdd = async (event) => {
        event.preventDefault();

        const noteFromForm = {
            message,
            done: false
        }

        if (title && message) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(noteFromForm)
            }
            fetch(`http://localhost:8081/api/v1/notes`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: 'add-note',
                        payload: data
                    });
                });            

            formRef.current.reset();
        }
    }

    const onUpdate = async (event) => {
        event.preventDefault();

        const noteFromForm = {
            id: note.id,
            message,
            done: note.done,
            fkCategoryId: note.fkCategoryId
        }

        if (id && message) {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(noteFromForm)
            }
            fetch(`http://localhost:8081/api/v1/notes`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: 'update-note',
                        payload: data.notes.filter(data => data.id === note.id)[0]
                    });
                });            

            formRef.current.reset();
            setUpdate(false);
            setNoteId(0);
        }
    }

    return (
        <div>
            <form action="" className='form-control' ref={formRef}>
                <label htmlFor="message">Message:</label>
                <input type="text" onChange={addingMessage} value={message} id='message' placeholder='Enter a message'/>
                <input type="submit" className='btn btn-block' onClick={update?onUpdate:onAdd} id='title' value="Add note" />
            </form>        
            <TaskList setMessage={setMessage} setUpdate={setUpdate} setNote={setNote}/>
        </div>
    )
}

export default TaskForm
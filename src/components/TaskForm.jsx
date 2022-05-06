import React, { useContext, useState, useRef } from 'react'
import { types } from '../state_manager/Reducer';
import { Store } from '../state_manager/StoreProvider'
import TaskList from './TaskList'


const TaskForm = ({categoryId}) => {

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
            done: false,
            fkCategoryId: categoryId
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
                        type: types.addNote,
                        payload: data
                    });
                });            

            formRef.current.reset();
        }
    }

    const onUpdate = async (event) => {
        event.preventDefault();

        const noteUpdate = {
            id: note.id,
            message,
            done: note.done,
            fkCategoryId: note.fkCategoryId
        }
        
        if (note.id && message && note.fkCategoryId) {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(noteUpdate)
            }
            fetch(`http://localhost:8081/api/v1/notes`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: types.updateNote,
                        payload: data.notes.filter(data => data.id === note.id)[0]
                    });
                });
        }
        
        setUpdate(false);
        formRef.current.reset();
    }

    return (
        <div>
            <form action="" className='form-control' ref={formRef}>
                <label htmlFor="message">Message:</label>
                <input type="text" onChange={addingMessage} value={message} id='message' placeholder='Enter a message'/>
                <input type="submit" className='btn btn-block' onClick={update?onUpdate:onAdd} id='title' value={update?"Update note":"Add note"} />
            </form>        
            <TaskList categoryId={categoryId} setMessage={setMessage} setUpdate={setUpdate} setNote={setNote}/>
        </div>
    )
}

export default TaskForm
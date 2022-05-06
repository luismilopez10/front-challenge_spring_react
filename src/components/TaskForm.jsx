import React, { useContext, useState, useRef } from 'react'
import { Store } from '../state_manager/StoreProvider'

const TaskForm = () => {

    const formRef = useRef(null);


    const onAdd = async (event) => {
        event.preventDefault();

        const noteFromForm = {
            title,
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

    const {state, dispatch} = useContext(Store);

    const [title, setTitle] = useState('');

    const [message, setMessage] = useState('');

    const addingTitle = (ev) => {
        setTitle(ev.target.value);
    }

    const addingMessage = (ev) => {
        setMessage(ev.target.value);
    }

    return (
        <form action="" className='form-control' ref={formRef}>
            <label htmlFor="title">Title:</label>
            <input type="text" onChange={addingTitle} id='title'/>
            <label htmlFor="message">Message:</label>
            <input type="text" onChange={addingMessage} id='message'/>
            <input type="submit" className='btn btn-block' onClick={onAdd} id='title' value="Add note" />
        </form>
    )
}

export default TaskForm
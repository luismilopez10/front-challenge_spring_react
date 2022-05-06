import React, { useContext, useState, useRef } from 'react'
import { types } from '../state_manager/Reducer';
import { Store } from '../state_manager/StoreProvider'
import CategoryList from './CategoryList'
import TaskForm from './TaskForm'

const CategoryForm = () => {
    
    const formRef = useRef(null);
    
    const {state, dispatch} = useContext(Store);

    const [categoryName, setCategoryName] = useState('');

    const addingCategoryName = (event) => {
        setCategoryName(event.target.value);
    }

    const onAdd = async (event) => {
        event.preventDefault();

        const categoryFromForm = {
            name: categoryName
        }

        if (categoryName) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(categoryFromForm)
            }
            fetch(`http://localhost:8081/api/v1/categories`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: types.addCategory,
                        payload: data
                    });
                });            

            formRef.current.reset();
        }
    }

    return (
        <div>
            <form action="" className='form-control' ref={formRef}>
                <label htmlFor="message">Category:</label>
                <input type="text" onChange={addingCategoryName} id='message' placeholder='New category name'/>
                <input type="submit" className='btn btn-block' onClick={onAdd} id='title' value="Add category"/>
            </form>
            <div className="container">
                <CategoryList />
            </div>
        </div>
    )
}

export default CategoryForm
import React, { useContext, useState, useRef } from 'react'
import { fncCreateCategory } from '../services/Category';
import { Store } from '../state_manager/StoreProvider'
import CategoryList from './CategoryList'

const CategoryForm = () => {
    
    const formRef = useRef(null);
    
    const {state, dispatch} = useContext(Store);

    const [categoryName, setCategoryName] = useState('');

    const addingCategoryName = (event) => {
        setCategoryName(event.target.value);
    }

    const onCreateCategory = async (event) => {
        event.preventDefault();
        await fncCreateCategory(categoryName, dispatch);
        formRef.current.reset();
    }

    return (
        <div>
            <form action="" className='form-control' ref={formRef}>
                <label htmlFor="categoryName">Category:</label>
                <input type="text" onChange={addingCategoryName} id='categoryName' placeholder='New category name'/>
                <input type="submit" className='btn btn-block' onClick={onCreateCategory} id='title' value="Add category"/>
            </form>
            <div className="container">
                <CategoryList />
            </div>
        </div>
    )
}

export default CategoryForm
import React, { useContext, useEffect } from 'react'
import { Store } from '../state_manager/StoreProvider'
import { BiTrashAlt } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'
import TaskForm from './TaskForm'
import { types } from '../state_manager/Reducer'

const CategoryList = () => {

    const {state, dispatch} = useContext(Store)

    useEffect(()=>{
        fetchAllCategories()
        .then(categories=>{
            let action = {
                type: types.getCategories,
                payload: categories
            };
            dispatch(action);
        })
    }, [])

    const fetchAllCategories = async() => {
        return await fetch(`http://localhost:8081/api/v1/categories`)
        .then(response => response.json());
    }

    const onDelete = async (category) => {
        let response = await fetch(`http://localhost:8081/api/v1/categories/${category.id}`,
        {
            method: 'DELETE'
        });

        if (response.status === 200) {
            dispatch({
                type: types.removeCategory,
                payload: category
            });
        };
    }

  return (
    <div>
        <ul>
            {state.lstCategories.map(category => {
                return (
                    <li key={category.id} className='task'>
                        <h3>
                            {category.name}
                            <BiTrashAlt onClick={() => onDelete(category)} />
                        </h3>
                            <TaskForm categoryId={category.id} />
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default CategoryList
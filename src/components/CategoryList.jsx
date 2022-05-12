import React, { useContext, useEffect } from 'react'
import { Store } from '../state_manager/StoreProvider'
import { BiTrashAlt } from 'react-icons/bi'
import TaskForm from './TaskForm'
import { types } from '../state_manager/Reducer'
import cricket from '../../assets/cricket.gif'

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


    if (state.lstCategories.length===0) {
        return <center><img src={cricket} alt="cricket" style={{width:'30%'}}/></center>
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
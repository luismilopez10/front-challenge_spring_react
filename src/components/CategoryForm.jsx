import React, { useContext, useState, useRef } from 'react'
import { Store } from '../state_manager/StoreProvider'
import CategoryList from './CategoryList'
import TaskForm from './TaskForm'

const CategoryForm = () => {
  return (
    <div>
        <form action="" className='form-control'>
            <label htmlFor="message">Category:</label>
            <input type="text" onChange={() => {}} id='message' placeholder='New category name'/>
            <input type="submit" className='btn btn-block' onClick={() => {}} id='title' value="Add category"/>
        </form>
        <div className="container">
            <CategoryList />
        </div>
    </div>
  )
}

export default CategoryForm
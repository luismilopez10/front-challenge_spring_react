import React, { useContext, useState, useRef } from 'react'
import { Store } from '../state_manager/StoreProvider'
import TaskForm from './TaskForm'

const CategoryForm = () => {
  return (
    <div>
        <TaskForm />
    </div>
  )
}

export default CategoryForm
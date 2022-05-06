import React, { createContext, useReducer } from 'react'
import reducer from './Reducer'

const initialState = {
    lstCategories: [],
    lstNotes: []
}

const Store = createContext(initialState)

const StoreProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Store.Provider value={{state, dispatch}}>
            {children}
        </Store.Provider>
    )
} 

export default StoreProvider

export {Store, initialState}
const types = {
    getCategories: 'get-categories',
    addCategory: 'add-category',
    removeCategory: 'remove-category',
    updateCategory: 'update-category',

    getNotes: 'get-notes',
    addNote: 'add-note',
    removeNote: 'remove-note',
    updateNote: 'update-note'
}

function reducer(state, action){
    switch(action.type){

        case types.getCategories:
            const stateWithAllCategories = {
                ...state,
                lstCategories: action.payload
            }

            return stateWithAllCategories;

        case types.addCategory:
            const newCategory = action.payload;

            const newListOfCategorysAddedOne = [...state.lstCategories, newCategory];

            const newStateAddCategory = {...state, lstCategories: newListOfCategorysAddedOne};

            return newStateAddCategory;

        case types.removeCategory:
            const newlstCategoriesWithoutPayloadNote = state.lstCategories.filter(category => category.id !== action.payload.id);

            const newStateWithCategoryDeleted = {...state, lstCategories: newlstCategoriesWithoutPayloadNote};

            return newStateWithCategoryDeleted;

        case types.getNotes:
            const stateWithAllNotes = {
                ...state,
                lstNotes: action.payload
            }

            return stateWithAllNotes;

        case types.addNote:
            const newNote = action.payload;

            const newListOfNotesAddedOne = [...state.lstNotes, newNote];

            const newStateAddNote = {...state, lstNotes: newListOfNotesAddedOne};

            return newStateAddNote;

        case types.removeNote:
            const newlstNotesWithoutPayloadNote = state.lstNotes.filter(note => note.id !== action.payload.id);

            const newStateWithNoteDeleted = {...state, lstNotes: newlstNotesWithoutPayloadNote};

            return newStateWithNoteDeleted;

        case 'update-note':
            const newlstNotes = state.lstNotes.map(note => note.id === action.payload.id ? action.payload : note);
            
            const newStateModifiedCheckbox = {...state, lstNotes: newlstNotes};

            return newStateModifiedCheckbox;
    }
}

export default reducer
export {types}
const types = {
    getCategories: 'get-categories',
    addCategory: 'add-category',
    removeCategory: 'remove-category',

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
            const stateWithAllNotes = {...state, lstNotes: action.payload}

            return stateWithAllNotes;

        case types.addNote:
            const categoryModified = action.payload;
            const newNoteId = Math.max(...categoryModified.notes.map(note => note.id));
            const newNote = categoryModified.notes.filter(note => note.id===newNoteId)[0]

            const OldCategoryList = [...state.lstCategories];
            const NewCategoryList = OldCategoryList.map(category=>{
                if (category.id === categoryModified.id) {
                    category.notes = categoryModified.notes
                }
                return category;
            })
            const newStateOfNotes  = [...state.lstNotes, newNote];

            const newStateOfCategoriesAndNotes = {...state, lstCategories: NewCategoryList, lstNotes: newStateOfNotes};

            return newStateOfCategoriesAndNotes;

        case types.removeNote:
            const newlstNotesWithoutPayloadNote = state.lstNotes.filter(note => note.id !== action.payload.id);

            const newStateWithNoteDeleted = {...state, lstNotes: newlstNotesWithoutPayloadNote};

            return newStateWithNoteDeleted;

        case types.updateNote:
            const newlstNotes = state.lstNotes.map(note => note.id === action.payload.id ? action.payload : note);
            
            const newStateModifiedCheckbox = {...state, lstNotes: newlstNotes};

            return newStateModifiedCheckbox;
    }
}

export default reducer
export {types}
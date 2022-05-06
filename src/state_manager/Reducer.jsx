function reducer(state, action){
    switch(action.type){

        case 'get-notes':
            const stateWithAllNotes = {
                ...state,
                lstNotes: action.payload
            }

            return stateWithAllNotes;

        case 'add-note':
            const newNote = action.payload;

            const newListOfNotesAddedOne = [...state.lstNotes, newNote];

            const newStateAddNote = {
                ...state, lstNotes: newListOfNotesAddedOne
            };

            return newStateAddNote;

        case 'remove-note':
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
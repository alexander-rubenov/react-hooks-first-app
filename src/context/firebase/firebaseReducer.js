import {SHOW_LOADER, ADD_PRODUCT, EDIT_PRODUCT, UPDATE_QUANITY, FETCH_NOTES, REMOVE_PRODUCT} from '../types';

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_PRODUCT]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload],
    }),
    [EDIT_PRODUCT]: (state, {payload}) => ({
        ...state,
        notes: state.notes.map(note => {
            if (note.id === payload.id) {
                return payload.editingProduct
            }
            return note
        })
    }),
    [UPDATE_QUANITY]: (state, {payload}) =>({
        ...state,
        notes: state.notes.map(note => {
            if (note.id === payload.updateProduct.id) {
                const newNote = note
                newNote.quantity = payload.updateProduct.quantity

                return newNote
            }
            return note
        })
    }),
    [FETCH_NOTES]: (state, {payload}) => ({
        ...state,
        notes: payload,
        loading: false,
    }),
    [REMOVE_PRODUCT]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload),
    }),
    DEFAULT: state => state,
};

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};

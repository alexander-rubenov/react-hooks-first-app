import {SHOW_LOADER, ADD_PRODUCT, EDIT_PRODUCT, UPDATE_QUANITY, FETCH_NOTES, REMOVE_PRODUCT, ASCENDING_SORT, DESCENDING_SORT, FILTER_BY_CATEGORY} from '../types';

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
        filteredProducts: [],
    }),
    [REMOVE_PRODUCT]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload),
    }),
    [ASCENDING_SORT]: (state, {payload}) => ({
        ...state,
        notes: state.notes.sort((a, b) => {
            if (payload === 'sortByPrice') {
                return a.price - b.price
            } else if (payload === 'sortByQuantity') {
                return a.quantity - b.quantity
            }
        })
    }),
    [DESCENDING_SORT]: (state, {payload}) => ({
        ...state,
        notes: state.notes.sort((a, b) => {
            if (payload === 'sortByPrice') {
                return b.price - a.price
            } else if (payload === 'sortByQuantity') {
                return b.quantity - a.quantity
            }
        })
    }),
    [FILTER_BY_CATEGORY]: (state, {payload}) => ({
        ...state,
        filteredProducts: state.notes.filter(note => note.category === payload),
    }),
    DEFAULT: state => state,
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}

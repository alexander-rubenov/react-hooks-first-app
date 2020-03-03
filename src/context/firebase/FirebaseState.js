import React, {useReducer} from 'react'
import axios from 'axios'
import {FirebaseContext} from "./firebaseContext"
import {firebaseReducer} from "./firebaseReducer"
import {SHOW_LOADER, REMOVE_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT, UPDATE_QUANITY, FETCH_NOTES} from '../types'


const url = process.env.REACT_APP_DB_URL


export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false,
    };
    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get(`${url}/notes.json`)

        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        });

        dispatch({type: FETCH_NOTES, payload})
    };

    const addProduct = async ({title, category, weight, price, quantity, article, maker}) => {
        const newProduct = {
            title,
            category,
            weight,
            price,
            quantity,
            article,
            maker
        }

        try {
            const res = await axios.post(`${url}/notes.json`, newProduct);
            const payload = {
                ...newProduct,
                id: res.data.name,
            }

            dispatch({type: ADD_PRODUCT, payload})

        } catch (e) {
            throw new Error(e.message)
        }
    }

    const editProduct = async ({id, title, category, weight, price, quantity, article, maker}) => {
        const editingProduct = {
            title,
            category,
            weight,
            price,
            quantity,
            article,
            maker
        }

        try {
            await axios.put(`${url}/notes/${id}.json`, editingProduct);
            const payload = {
                editingProduct,
                id,
            }

            dispatch({type: EDIT_PRODUCT, payload})

        } catch (e) {
            throw new Error(e.message)
        }
    }

    const updateQuanity = async (product) => {
        const updateProduct = {
            ...product,
        }

        try {
            await axios.put(`${url}/notes/${product.id}.json`, updateProduct);
            const payload = {
                updateProduct,
            }

            dispatch({type: UPDATE_QUANITY, payload})

        } catch (e) {
            throw new Error(e.message)
        }


    }

    const removeProduct = async id => {
        await axios.delete(`${url}/notes/${id}.json`);

        dispatch({
            type: REMOVE_PRODUCT,
            payload: id,
        })
    };

    return (
        <FirebaseContext.Provider value={{
            showLoader, addProduct, editProduct, updateQuanity, removeProduct, fetchNotes,
            loading: state.loading,
            notes: state.notes,
        }}>
            {children}
        </FirebaseContext.Provider>
    )
};

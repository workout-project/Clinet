import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const DetailContext = createContext()


//getting the action type and according to that we update our state
export const detailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return {
                details: action.payload
            }
        case 'CREATE_DETAILS':
            return {
                details: [action.payload, state.details]
            }
        default:
            return state
    }
}

//childeren basically is the app components so we warp around App with PeepsContextProvider in index.js bc we wanna get the context of App
export const DetailsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(detailsReducer, {
        details: null
    })

    // console.log('state in func',state)
    return (
        <DetailContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DetailContext.Provider>
    )
}

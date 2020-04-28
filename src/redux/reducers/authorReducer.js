import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action){
    switch(action.type){
        case actionTypes.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        case actionTypes.CREATE_AUTHOR:
            return [...state, {...action.author}];
        case actionTypes.CREATE_AUTHOR_SUCCESS:
            return [...state, {...action.author}];
        default:
            return state;
    }
}
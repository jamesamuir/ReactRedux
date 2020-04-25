import * as actionTypes from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import {apiCallError, beginApiCall} from "./apiStatusAction";


export function loadAuthorsSuccess(authors){
    return {type: actionTypes.LOAD_AUTHORS_SUCCESS, authors: authors};
}

export function loadAuthors(){
    return function(dispatch){

        // invoke loader
        dispatch(beginApiCall());

        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            dispatch(apiCallError());
            throw error;
        })
    }
}
import * as actionTypes from "./actionTypes";
import * as authorApi from "../../api/authorApi";


export function loadAuthorsSuccess(authors){
    return {type: actionTypes.LOAD_AUTHORS_SUCCESS, authors: authors};
}

export function loadAuthors(){
    return function(dispatch){
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw error;
        })
    }
}
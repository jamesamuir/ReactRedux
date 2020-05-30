import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/users/";

export function getCurrentUser() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}

export function login(email, password) {
    return fetch(baseUrl + "login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user: { email, password } })
    })
        .then(handleResponse)
        .catch(handleError);
}

export function register(username, email, password) {
    return fetch(baseUrl + "register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user: { username, email, password } })
    })
        .then(handleResponse)
        .catch(handleError);
}

export function saveUser(user) {
    return fetch(baseUrl, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(handleResponse)
        .catch(handleError);
}



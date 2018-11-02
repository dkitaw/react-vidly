import http from "./httpService";
import { apiUrl } from '../config.json';

function endPointUrl() {
    return `${apiUrl}/auth/`;
}

export function login(email, password) {
    return http.post(endPointUrl(), {
        email, 
        password
    });
}
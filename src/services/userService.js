import http from "./httpService";
import { apiUrl } from '../config.json';

function endPointUrl(id) {
    if (id) {
        return `${apiUrl}/users/${id}`;
    } else {
        return `${apiUrl}/users/`;
    }
}

export function register(user) {
    return http.post(endPointUrl(), {
        email: user.username,
        password: user.password,
        name: user.name
    });
}
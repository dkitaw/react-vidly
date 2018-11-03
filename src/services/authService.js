import jwtDecode from 'jwt-decode';
import http from "./httpService";
import { apiUrl } from '../config.json';

const tokenKey = 'token';

function endPointUrl() {
    return `${apiUrl}/auth/`;
}

export async function login(email, password) {
    const { data: jwt } = await http.post(endPointUrl(), { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        // There's not a problem. JWT not was recibed.
        return null;
    }
}

export default {
    login, loginWithJwt, logout, getCurrentUser
}
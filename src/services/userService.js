import http from "./httpService";

function endPointUrl(id) {
    if (id) {
        return `/users/${id}`;
    } else {
        return `/users/`;
    }
}

export function register(user) {
    return http.post(endPointUrl(), {
        email: user.username,
        password: user.password,
        name: user.name
    });
}
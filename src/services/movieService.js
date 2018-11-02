import http from "./httpService";
import { apiUrl } from '../config.json';

function endPointUrl(id) {
    if (id) {
        return `${apiUrl}/movies/${id}`;
    } else {
        return `${apiUrl}/movies/`;
    }
}

export function getMovies() {
    return http.get(endPointUrl());
}

export function getMovie(movieId) {
    return http.get(endPointUrl(movieId));
}

export function saveMovie(movie) {
    if (movie._id) {
        
        const body = { ...movie };
        delete body._id;

        return http.put(endPointUrl(movie._id), body);
    } else {
        return http.post(endPointUrl(), movie);
    }
}

export function deleteMovie(movieId) {
    return http.delete(endPointUrl(movieId));
}

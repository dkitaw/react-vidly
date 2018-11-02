import http from "./httpService";

export function getMovies() {
    return http.get("http://localhost:3000/api/movies/");
}

export function deleteMovie(movieId) {
    return http.delete("http://localhost:3000/api/movies/" + movieId);
}

export function getMovie(movieId) {
    
}

export function saveMovie(movie) {
    
}
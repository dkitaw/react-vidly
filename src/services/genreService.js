import http from './httpService';

export function getGenres() {
    return http.get('http://localhost:3000/api/genres/');
}
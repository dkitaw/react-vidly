import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import MoviesTable from './moviesTables';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 5,
        currentPage: 1,
        selectedGenre: {_id: '', name: 'All Genres'},
        sortColumn: { field: 'title', order: 'asc' }
    };

    componentDidMount() {
        const genres = [this.state.selectedGenre, ...getGenres()];

        this.setState({
            movies: getMovies(),
            genres
        });
    }
    
    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn } = this.state;

        if (count === 0) {
            return <p>There are not movies in the database.</p>
        }
        
        const { totalCount, data } = this.getPagedData();

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                    <p>There are {totalCount} movies in the database.</p>
                    <MoviesTable
                        movies={data}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        onSort={this.handleSort}
                        sortColumn={sortColumn} />     
                    <Pagination 
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            </div>
        );
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };
    
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({
            movies
        });
    };

    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    handleGenreSelect = genre => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1
        });
    };

    handleSort = sortColumn => {
        this.setState({
            sortColumn
        });
    };

    getPagedData() {
        const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state;

        const filtered = selectedGenre._id !== ''
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;
        
        const sorted = _.orderBy(filtered, [sortColumn.field], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return {
            totalCount: filtered.length,
            data: movies
        }
    }
}

export default Movies;
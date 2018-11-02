import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import MoviesTable from './moviesTables';
import { paginate } from '../utils/paginate';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 5,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: {_id: '', name: 'All Genres'},
        sortColumn: { field: 'title', order: 'asc' }
    };

    async componentDidMount() {
        let { data: genres } = await getGenres();

        genres = [this.state.selectedGenre, ...genres];

        const { data: movies } = await getMovies();

        this.setState({
            movies,
            genres
        });
    }

    componentDidUpdate() {
        const { movies, pageSize, currentPage } = this.state;
        const itemsPageCount = paginate(movies, currentPage, pageSize).length;

        if (movies.length > 0 && itemsPageCount === 0) {
            this.setState({
                currentPage: 1
            });
        }
    }
    
    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

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
                    <Link
                        to="/movies/new"
                        className="btn btn-primary"
                        style={{marginBottom:20}} >New Movie</Link>
                    <p>There are {totalCount} movies in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
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

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        } catch (error) {
            
            if (error.response && error.response.status === 404) {
                toast.error('This movie has already been deleted.');
            }

            this.setState({
                movies: originalMovies
            });
        }
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
            searchQuery: "",
            currentPage: 1
        });
    };

    handleSort = sortColumn => {
        this.setState({
            sortColumn
        });
    };

    handleSearch = query => {
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1
        });
    };

    getPagedData() {
        const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn, searchQuery } = this.state;

        let filtered = allMovies;

        if (searchQuery) {
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        }
        else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        }
                
        const sorted = _.orderBy(filtered, [sortColumn.field], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);
        
        return {
            totalCount: filtered.length,
            data: movies
        }
    }
}

export default Movies;
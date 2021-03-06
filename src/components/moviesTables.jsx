import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';
import authService from '../services/authService';

class MoviesTable extends Component {
    
    deleteColumn = {
        key: 'delete',
        content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
    };

    columns = [
        { 
            field: 'title', 
            label: 'Title', 
            content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> 
        },
        { field: 'genre.name', label: 'Genre' },
        { field: 'numberInStock', label: 'Stock' },
        { field: 'dailyRentalRate', label: 'Rate' },
        { 
            key: 'like', 
            content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        }
    ];

    constructor() {
        super();
        const user = authService.getCurrentUser();

        if (user && user.isAdmin) {
            this.columns.push(this.deleteColumn);
        }
    }

    render() { 
        const { movies, sortColumn, onSort } = this.props;
        
        return (
            <Table
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
                data={movies} />
        );
    }
}

export default MoviesTable;

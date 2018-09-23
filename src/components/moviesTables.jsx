import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';

class MoviesTable extends Component {
    columns = [
        { field: 'title', label: 'Title' },
        { field: 'genre.name', label: 'Genre' },
        { field: 'numberInStock', label: 'Stock' },
        { field: 'dailyRentalRate', label: 'Rate' },
        { 
            key: 'like', 
            content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        },
        { 
            key: 'delete',
            content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
        }
    ];

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

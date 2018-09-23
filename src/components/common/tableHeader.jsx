import React, { Component } from 'react';

class TableHeader extends Component {
    render() { 
        return ( 
            <thead>
                <tr>
                    {this.props.columns.map(column => 
                        <th 
                            key={column.field || column.key}
                            onClick={() => this.raiseSort(column.field)}
                            className={column.field ? 'clickable' : ''}
                        >{column.label} {this.renderSortIcon(column)}</th>
                    )}
                </tr>
            </thead> 
        );
    }

    raiseSort = field => {
        const sortColumn = {...this.props.sortColumn};

        if (sortColumn.field === field) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.field = field;
            sortColumn.order = 'asc';
        }

        this.props.onSort(sortColumn);
    };

    renderSortIcon = (column) => {
        const { sortColumn } = this.props;

        if (column.field !== sortColumn.field) {
            return null;
        } 
        
        if (sortColumn.order === 'asc') {
            return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
        } else {
            return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
        }
    };
}
 
export default TableHeader;
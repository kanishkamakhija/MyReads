import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BooksCategory from './BooksCategory';


class BookSearch extends React.Component {

    constructor(props){
        super(props);
        this.filteredBooks = [];
    }
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }));
        this.handleBookSearch(query);
        
    }
    componentWillReceiveProps(nextProps) {
        this.filteredBooks = nextProps.books;
    }

    handleBookSearch = (query) => {
        BooksAPI.search(query)
        .then(result => {this.filteredBooks = result},
                    err => console.log(err));
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <BooksCategory bookList={this.filteredBooks} />     
                            </div>
                        </div>
                    </div>
                    {/* <ol className="books-grid"></ol> */}
                </div>
            </div>
        )
    }
}

export default BookSearch;
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BooksCategory from './BooksCategory';


class BookSearch extends React.Component {

   
    state = {
        query: '',
        filteredBooks : this.props.books
    }

    handleChange = (event) => {
        this.handleBookSearch(event.target.value);
    }

    updateQuery = (query) => {
        this.setState(() => ({ query: query.trim() }));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ filteredBooks : nextProps.books });
    }

    updateFilteredBooks = (result) => {
        if (!result.error) {
            console.log("Match");
            this.setState(() => ({ filteredBooks : result}));
            
        } else {
            console.log("NO match");
            this.setState(() => ({ filteredBooks : []}) )
        }
    }

    handleBookSearch = (query) => {
        this.updateQuery(query);
        if(query.length !== 0){
            const promise = BooksAPI.search(query);
            promise.then(result => {console.log("result", result)});
            promise.then(result => {
                if(!result.error){
                    this.updateFilteredBooks(result);
                } else {
                    result = [];
                    this.updateFilteredBooks(result) 
                }    });    
            promise.then(result => {console.log("filtered books:", this.state.filteredBooks)});
            return promise;
        } else {
            this.updateFilteredBooks(this.props.books);
            console.log("empty query", this.state.filteredBooks)
        }
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <BooksCategory bookList={this.state.filteredBooks} updateBookShelf={this.props.updateBookShelf} /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookSearch;
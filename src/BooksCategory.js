// 3 different category of books in this

//currently Reading

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

class BooksCategory extends React.Component {

    handleBookState = (event) => {
        console.log(event.target.value);

    }
    
    render() {
        const books = this.props.books
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        this.props.bookList.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`  }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading" onClick={this.handleBookState}>Currently Reading</option>
                                                <option value="wantToRead" onClick={this.handleBookState}>Want to Read</option>
                                                <option value="read" onClick={this.handleBookState}>Read</option>
                                                <option value="none" onClick={this.handleBookState}>None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors.toString()}</div>
                                </div>
                            </li>
                        ))
                    }
                </ol>
            </div>
        )
    }
}

export default BooksCategory;
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './App.css';
// import BooksAPI from './BooksAPI';



class BookSearch extends React.Component {

    state = {
        query : ''
    }
    
    updateQuery = (query) => {
        this.setState(() => ({
            query : query.trim()
        }))
    }
    render() {

        // const filterBooks = this.state.query === '' ? books : BooksAPI.search(this.state.query)

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                {/* filterBooks.map((book) => ({
                    <li>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
                        <div className="book-shelf-changer">
                          <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">The Hobbit</div>
                      <div className="book-authors">J.R.R. Tolkien</div>
                    </div>
                  </li>
                })) */}
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }
}

export default BookSearch;
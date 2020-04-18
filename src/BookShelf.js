import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import BooksCategory from './BooksCategory';



class BookShelf extends React.Component {

//   static propTypes = {
//     prop name : PropTypes.array.isRequired,
//     prop name : PropTypes.func.isRequired
    
// }

  render() {
    if(!this.props.books.length) {
      return(
        <p>Loading</p>
      )
    }
    const allBooks = this.props.books;
    const currentlyReadingBooks = allBooks.filter((book) => (book.shelf === "currentlyReading"));
    const wantToReadBooks = allBooks.filter((book) => (book.shelf === "wantToRead"));
    const readBooks = allBooks.filter((book) => (book.shelf === "read"));
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BooksCategory bookList={currentlyReadingBooks}/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BooksCategory bookList={wantToReadBooks}/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BooksCategory bookList={readBooks}/>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' className="open-search-link">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf;

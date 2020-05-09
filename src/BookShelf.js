import React from "react"
import { Link } from "react-router-dom"
import "./App.css"
import BooksCategory from "./BooksCategory"

class BookShelf extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.loading) {
      return (
        <p>Loading</p>
      )
    }
    const { currentlyReading, wantToRead, read } = this.props
    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <BooksCategory key="currentlyReading" bookList={currentlyReading} updateBookShelf={this.props.updateBookShelf} />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <BooksCategory key="wantToRead" bookList={wantToRead} updateBookShelf={this.props.updateBookShelf} />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <BooksCategory key="read" bookList={read} updateBookShelf={this.props.updateBookShelf} />
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

export default BookShelf

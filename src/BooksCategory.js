// 3 different category of books in this

//currently Reading

import React from "react"
// import PropTypes from "prop-types"
import "./App.css"

class BooksCategory extends React.Component {
    
    handleBookState = (event, book) => {
      const shelf = event.target.value
      this.props.updateBookShelf(book, shelf)
    }
    render() {

      if(!this.props.bookList) {
        return(<p>No Match Found</p>)
      }
        
      return (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {   
              this.props.bookList.length >0 && this.props.bookList.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" key={book.id} style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})`  }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : "none"} onChange={(event) => this.handleBookState(event, book)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                        {/* <BookShelfChanger
                      shelf={book.shelf ? book.shelf : 'none'}
                      onChangeShelf={(newShelf) => {
                        this.handleChange(book, newShelf)
                      }}
                    ></BookShelfChanger> */}
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ), this)
            }
          </ol>
        </div>
      )
    }
}

export default BooksCategory
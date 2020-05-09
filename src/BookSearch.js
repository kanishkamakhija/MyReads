import React from "react"
import { Link } from "react-router-dom"
import "./App.css"
import * as BooksAPI from "./BooksAPI"
import BooksCategory from "./BooksCategory"

class BookSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      filteredBooks : []
    }
  }

  componentWillUnmount() {
    this.handleBookSearch("")
  }

    handleBookSearch = (query) => {
      this.setState({ query: query.trim() })
      console.log("in handleBook")
      clearTimeout()
      setTimeout(() => {
        if(query.length > 0){
          return BooksAPI.search(query)
            .then(result => {
              if(!result.error){
                let match
                this.props.books.forEach((book) => {
                  match = result.find((rbook) => (rbook.id === book.id))
                  match && (match.shelf = book.shelf)
                })
                console.log("set filtered array")
                this.setState(() => ({ filteredBooks : result}))
              } else {
                console.log("set empty array")
                this.setState({ filteredBooks : []})
              }
            })
        }
        else {
          console.log("empty")
          this.setState(() => ({ filteredBooks : []}))
        }
      },3000)
    }
    render() {
      let bookList = this.state.filteredBooks

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) =>this.handleBookSearch(event.target.value)} />
            </div>
          </div>
          <div className="search-books-results">
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <BooksCategory bookList={bookList} updateBookShelf={this.props.updateBookShelf} /> 
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default BookSearch
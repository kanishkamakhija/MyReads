/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react"
import { Route } from "react-router-dom"
import BookSearch from "./BookSearch"
import BookShelf from "./BookShelf"
import * as BooksAPI from "./BooksAPI"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      loading: true,
	  }
  }

  componentDidMount()  {  
  	BooksAPI.getAll()
  		.then((books) => {
        const currentlyReading = books.filter((book) => (book.shelf === "currentlyReading"))
        const wantToRead = books.filter((book) => (book.shelf === "wantToRead"))
        const read = books.filter((book) => (book.shelf === "read"))
        this.setState({
          currentlyReading, 
          wantToRead, 
          read,
          books,
          loading: false
        })
      })
  }

  updateState = (res) => {
    const books = this.state.books
  	this.setState({
      currentlyReading: books.filter((book) => (res.currentlyReading.includes(book.id))),
  		wantToRead : books.filter((book) => (res.wantToRead.includes(book.id))), 
  		read: books.filter((book) => (res.read.includes(book.id))),
  	})
  }

  updateBookShelf = (book, shelf) => {
    this.setState(({books: prevBooks}) => {
      const match = prevBooks.filter((prevBook) => (prevBook.id === book.id))
      if (!match.length) {
        return {
          books: [...prevBooks, book]
        }
      }
    }, () => {
      BooksAPI.update(book, shelf)
        .then((data) => this.updateState(data))
    })
  }

  render() {
  	return (
  		<div className="app">
  			<Route path='/search'  render={() => (
  				<BookSearch books={this.state.books} updateBookShelf={this.updateBookShelf}/>
  			)}/>
  			<Route exact path='/' render={() => (
          <BookShelf
            books={this.state.books} 
  					currentlyReading={this.state.currentlyReading} 
  					wantToRead={this.state.wantToRead}
  					read={this.state.read}
  					updateBookShelf={this.updateBookShelf} 
  					loading={this.state.loading}/>
  			)}/>
  		</div>
  	)
  }
}

export default App

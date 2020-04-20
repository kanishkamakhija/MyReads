import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import BookSearch from './BookSearch';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';


/**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
class App extends React.Component {
  state = {
    books : [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount()  {  
  const promise =  BooksAPI.getAll();
  promise.then((books) => { 
    this.setState(() => ({ books: books }) )
  })
  promise.then((books) => {
    const currentlyReadingBooks = books.filter((book) => (book.shelf === "currentlyReading"));
    const wantToReadBooks = books.filter((book) => (book.shelf === "wantToRead"));
    const readBooks = books.filter((book) => (book.shelf === "read"));
    this.setState({currentlyReading: currentlyReadingBooks, 
                  wantToRead: wantToReadBooks, 
                  read: readBooks});
  })
  }

  updateState = (res) => {
    this.setState({currentlyReading: res.currentlyReading, 
      wantToRead : res.wantToRead, 
      read: res.read});
  }

  updateBookShelf = (book, shelf) => {
    const promise = BooksAPI.update(book, shelf);
    promise.then((data) => 
    this.updateState(data));
  }



  render() {
    const allBooks = this.state.books;
    
    return (
      <div className="app">
        <Route path='/search'  render={() => (
          <BookSearch books={this.state.books} updateBookShelf={this.updateBookShelf}/>
          )}/>
        <Route exact path='/' render={() => (
          <BookShelf books={this.state} updateBookShelf={this.updateBookShelf} />
          )}/>
      </div>
    )
  }
}

export default App

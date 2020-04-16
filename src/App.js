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
    books : []
  }

  componentDidMount()  {
    BooksAPI.getAll()
      .then((books) => { 
        this.setState(() => ({ books : books}) )
      })
      
  }

  render() {
    return (
      <div className="app">
        <Route path='/search'  render={() => (
          <BookSearch />
          )}/>
        <Route exact path='/' render={() => (
          <BookShelf books={this.state.books}/>
          )}/>
      </div>
    )
  }
}

export default App

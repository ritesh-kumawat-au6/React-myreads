import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import ListOfBooks from './ListOfBooks'
import SearchBooks from './SearchBooks'
import AppLogo from './icons/BrainFood.svg'

class BrainFood extends Component {
  state = {
    books: []
  }

  /*getting the books from API and setting the state of books array to that
    Once the component has been mounted, the componentDidMount() lifecycle event occurs
	The get request from the BooksAPI.js is run which sends a request to the Book Lender api.
	When the data is returned, setState() is called and updates the books property
  */
  componentDidMount() {
    document.title = "BrainFood";
    BooksAPI.getAll().then((books) => this.setState({ books: books }));
  }

  //To update the book status
  changeTheShelf = (bookID, event) => {
    BooksAPI.update(bookID, event.target.value).then(()=> {
      BooksAPI.getAll().then((books) => this.setState({ books: books }));
    })
  }

  render() {

    const shelves = [
      {
        type: 'currentlyReading',
        name: 'Currently Reading'
      },
      {
        type: 'wantToRead',
        name: 'Want to Read'
      },
      {
        type: 'read',
        name: 'Read'
      }
    ]

    return (
      <div className="app">
      {
      /* React Router will render as following when the url path matches "/" exactly
      The Route component is a critical piece of building an application with React Router
       because it's the component which is going to decide which components are rendered based on the current URL path.
      */
  	  }

      {
        /* React Router will be performing rendering as following
           when the url path matches "/search"
       */
      }

        <Route exact path="/" render={() => (
          <div className="list-Of-books">
            <div className="list-Of-books-title">
              <img src={AppLogo} alt="BrainFood"/>
            </div>
            <div className="list-Of-books-content">
              { shelves.map( shelf => (
                <ListOfBooks
                  books={ this.state.books.filter( ( book ) => ( book.shelf === shelf.type )) }
                  nameOfTheShelf={ shelf.name }
                  changeTheShelf={ this.changeTheShelf }
                />
              ))
            }
            </div>
            <div className="open-search">
              <Link to="/SearchBooks">Add a book</Link>
            </div>
          </div>
        )}/>

      {
      //React Router will be performing rendering as following when the url path matches "/search"
      }

       <Route path="/SearchBooks" render={() => (
          <SearchBooks
            books={this.state.books}
            changeTheShelf={this.changeTheShelf} />
        )}/>
      </div>
    )
  }
}

export default BrainFood;

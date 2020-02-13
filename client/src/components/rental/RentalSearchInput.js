import React from 'react';
import { withRouter } from 'react-router-dom';

class RentalSearchInput extends React.Component {

  constructor() {
    super();
    this.searchInput = React.createRef();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleSearch() {
    const { history } = this.props;
    const city = this.searchInput.current.value;

    city ? history.push(`/rentals/${city}/homes`) : history.push('/rentals');
  }


  render() {
    return (
      <div className='rentalListing-search__input'>
        <input onKeyPress={(event) => { this.handleKeyPress(event)}}
               ref={this.searchInput}
               className='form-control mr-sm-2 bwm-search'
               type='search'
               placeholder='Try "New York"'
               aria-label='Search'></input>
        <button onClick={() => {this.handleSearch()}}
                className='button button-gray'
                type='submit'>Search</button>
      </div>
    )
  }
}


export default withRouter(RentalSearchInput)

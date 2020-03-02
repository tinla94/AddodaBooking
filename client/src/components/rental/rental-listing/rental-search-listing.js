import React from 'react';
import { RentalList } from './rental-list';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { toUpperCase } from 'helpers';
import { getAllRentals } from '../../../actions/rentals.action';


class RentalSearchListing extends React.Component {
  state = {
    searchedCity: ''
  }

  componentWillMount() {
    this.searchRentalsByCity();
  }

  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.city;
    const prevUrlParam = prevProps.match.params.city;

    if (currentUrlParam !== prevUrlParam) {
      this.searchRentalsByCity();
    }
  }

  searchRentalsByCity() {
    const searchedCity = this.props.match.params.city;
    this.setState({ searchedCity });

    this.props.dispatch(getAllRentals(searchedCity));
  }

  renderTitle() {
    const { errors, data } = this.props.rentals;
    const { searchedCity } = this.state;
    let title = '';

    if (errors.length > 0) {
      title = errors[0].detail;
    }

    if (data.length > 0) {
      title = `Search for "${toUpperCase(searchedCity)}" city`;
    }

    return (
      <div className="rental-search-listing">
        <h1 className="rental-search-listing__title">{title}</h1>
        <Link to="/rentals" className="button button-gray">
          Go Back
          </Link>
        <hr />
      </div>
    )
  }

  render() {
    return (
      <section id="rentalListing">
        {this.renderTitle()}
        <RentalList rentals={this.props.rentals.data} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals
  }
}

export default connect(mapStateToProps)(RentalSearchListing)

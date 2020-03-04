import React from 'react';
import { MapWithGeocode} from '../../map/GoogleMap';
import { connect } from 'react-redux';
import { reloadMapFinish } from '../../../actions/rentals.action';

class RentalMap extends React.Component {

  reloadMapFinish() {
    this.props.dispatch(reloadMapFinish());
  }

  render() {
    const { location, map: { isReloading } } = this.props;

    return (
      <MapWithGeocode
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API}&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `250px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
        isReloading={isReloading}
        mapLoaded={() => this.reloadMapFinish()}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    map: state.map
  }
}

export default connect(mapStateToProps)(RentalMap);

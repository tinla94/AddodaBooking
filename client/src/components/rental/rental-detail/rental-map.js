import React from 'react';
import { MapWithGeocode} from 'components/map/GoogleMap';
import { connect } from 'react-redux';
import { reloadMapFinish } from '../../../actions/rentals.action';

class RentalMap extends React.Component {

  reloadMapFinish() {
    this.props.dispatch(reloadMapFinish());
  }

  render() {
    const { location, map: {isReloading} } = this.props;

    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `405px` }} />}
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

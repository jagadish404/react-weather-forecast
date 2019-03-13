import React from 'react';
import { connect } from 'react-redux';
import { string, bool, shape } from 'prop-types';
import { Alert } from 'react-bootstrap';

class AlertBox extends React.Component {
	render() {
		const {
			alertText,
			showSpinner,
			alertStyle,
			showAlert
		} = this.props.weatherData;

		if (showAlert) {
			return (
				<Alert bsStyle={alertStyle}>
					<h4>
						{
							showSpinner &&
								<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" />
						}
						&nbsp;{alertText}
					</h4>
				</Alert>
			);
		}
		return null;
	}
}

function mapStateToProps(state) {
	return { weatherData: state.weatherData };
}

AlertBox.propTypes = {
	weatherData: shape({
		alertText: string.isRequired,
		showSpinner: bool.isRequired,
		alertStyle: string.isRequired,
		showAlert: bool.isRequired
	}).isRequired
};

export default connect(mapStateToProps, {})(AlertBox);

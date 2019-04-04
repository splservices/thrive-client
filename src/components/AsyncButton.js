import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "./Login";

class AsyncButton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button type="submit" variant="contained" color="primary" fullWidth={true} size='large' >
                    Login
                </Button>
            </div>

        );
    }
}

AsyncButton.propTypes = {};

export default AsyncButton;
import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
let openSnackbarFn;
class Notifier extends Component {
    state = {
        open:false,
        varient:'success',
        message:''
    };


    componentDidMount() {
        openSnackbarFn = this.openSnackbar;
    }



    openSnackbar = ({message})=>{
        this.setState({
            open:true,
            varient:'success',
            message:message
        })
    };

    closeSnackbar = ()=>{
        this.setState({
            open:false,
            message:'',
            varient:'success'
        })
    };

    render() {
        const message = (
            <span
                id="snackbar-message-id"
                dangerouslySetInnerHTML={{ __html: this.state.message }} />
        );
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                message={message}
                autoHideDuration={3000}
                onClose={this.closeSnackbar}
                open={this.state.open}
                varient={this.state.varient}
                SnackbarContentProps={{
                    'aria-describedby': 'snackbar-message-id',
                }}
            />
        );
    }
}
export function openSnackbar({ message }) {
    openSnackbarFn({ message });
}

export default Notifier;
import React from 'react';

class Alert extends React.Component {
    render() {
        var status;
        var message;
        console.log(this.props.status.error);
        if(this.props.status.error) {
            status = "danger";
            message = "Error: \b";
        } else {
            status = "success";
            message = "Success! \b";
        }
        return <>
            <div style={{marginTop: "30px"}} className={`alert alert-${status} alert-dismissible fade show`} role="alert">
                <span className="close closebtn" data-dismiss="alert" aria-label="Close" onClick={event=> this.props.removeAlert(event)}>
                    <span aria-hidden="true">&times;</span>
                </span>
                <strong>{message}</strong> {this.props.status.msg}
            </div>
        </>
    }
}

export default Alert;
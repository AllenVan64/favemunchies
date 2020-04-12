import React from 'react';
import axios from 'axios';
import Alert from './Alert.js';

class AddLocation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            location: '',
        }
    }

    componentDidMount() {
        this.props.utils.removeAlert();
    }


    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }

    handleLocationSubmit(event) {
        event.preventDefault();

        // Status dummie to edit values
        var status = {...this.props.status};
        axios.post('/locations', {name:this.state.location})
        .then(results=>{
            // reset location name
            this.setState({
                location:''
            });
            status.error = false;
            status.msg = results.data;
            this.props.utils.updateStatus(status);
            this.props.utils.updateAlert();
        })
        .catch(error=> {
            if(error.response) {
                // Update status to show error on alert
                status.error = true;
                status.msg = error.response.data;
                this.props.utils.updateStatus(status);
                this.props.utils.updateAlert();
            }
        });
    }

    render() {
        return <>
            <form className="form-container" onSubmit={event=>this.handleLocationSubmit(event)}>
                <p className="description">Add the locations where you will be visiting restaurants.</p>
                <label>
                    <p className="form-subtitle">Enter location name:</p>
                    <input className="form-control form-control-lg" type="text" placeholder="Enter location name" onChange={event=>this.handleLocationChange(event)} value={this.state.location}></input>
                </label>
                <button className="btn btn-dark" type='submit' value='Submit location'> Submit location</button>
                {this.props.alert}
            </form>
        </>
    }
}

export default AddLocation;
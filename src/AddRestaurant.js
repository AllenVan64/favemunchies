import React from 'react';
import axios from 'axios';

class AddRestaurant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantName: '',
            location: '',
            locations: [],
        }
    }

    // Refreshes dropdown list after mounting
    componentDidMount() {
        this.props.utils.removeAlert();
        axios.get('/locations')
        .then(results => {
            this.setState({locations: results.data});
        })
        .catch(error => console.log(error));
    }

    handleRestaurantChange(event) {
        this.setState({restaurantName: event.target.value});
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }

    handleRestaurantSubmit(event) {
        event.preventDefault();
        
         // Status dummie to edit values
         var status = {...this.state.status};

         axios.post('/restaurants', {name:this.state.restaurantName, location:this.state.location})
         .then(results=>{
             // Reset restaurant name
             this.setState({
                 restaurantName:''
             });
             // Update status to show success message on alert
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
            <form className="form-container" onSubmit={event=>this.handleRestaurantSubmit(event)}>
                <div className="form-group">
                    <p className="description">Found an ideal place to go for a dinner? Add it to your database to keep track of your favourite restaurants!</p>
                    <label>
                        <p className="form-subtitle">New Restaurant:</p>
                        <input className="form-control form-control-lg" type="text" placeholder="Enter restaurant name" onChange={event=>this.handleRestaurantChange(event)} value={this.state.restaurantName}></input>
                    </label>
                    <label>
                        <p className="form-subtitle">Choose a location:</p>
                        <select className="form-control form-control-lg" onChange={event=>this.handleLocationChange(event)}>
                            <option value=''>None</option>
                            {this.state.locations.map(location=><option key={location.name} value={location.name}>{location.name}</option>)}
                        </select>
                    </label>
                    <button className="btn btn-dark" type='submit' value='Submit restaurant'> Submit restaurant</button>
                    {this.props.alert}
                </div>
            </form>
        </>
    }
}

export default AddRestaurant;
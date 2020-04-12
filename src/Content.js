import React from 'react';
import AddRestaurant from './AddRestaurant.js';
import RestaurantList from './RestaurantList.js';
import AddLocation from './AddLocation';
import Alert from './Alert.js'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currPage: "ResList",
          alert: null,
          status: {
            error: undefined,
            msg: ''
          }
        }
        this.removeAlert = this.removeAlert.bind(this);
        this.updateAlert = this.updateAlert.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    removeAlert(event) {
        if(event !== undefined) {
            event.target.parentElement.style.display='none';
        }
        this.setState({alert: null});
    }

    updateAlert() {
        this.setState({
            alert: <Alert status={this.state.status} removeAlert={this.removeAlert}/>
        });
    }
    
    updateStatus(status) {
        this.setState({status});
    }

    render() {
        const utils = {
            removeAlert: this.removeAlert,
            updateAlert: this.updateAlert,
            updateStatus: this.updateStatus,
        }

        const components = {
            AddRes: AddRestaurant,
            AddLoc: AddLocation,
            ResList: RestaurantList
        }
        const ActivePage = components[this.props.currPage];
        
        return <>
            <div id="content">
                <ActivePage alert={this.state.alert} status={this.state.status} utils = {utils}/>
            </div>
        </>;
    }
}
  
export default Content; 
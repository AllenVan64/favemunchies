import React from 'react';
import axios from 'axios';

class RestaurantList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            locations: [],
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('/restaurants')
        .then(results => {
            this.setState({restaurants: results.data});
        })
        .catch(error => console.log(error));
        axios.get('/locations')
        .then(results => {
            this.setState({locations: results.data});
        })
        .catch(error => console.log(error));
    }

    renderLocation(location) {
        let restaurantList = document.getElementById("reslist-content");
        let locationList = document.createElement('ul');
        locationList.setAttribute("class", "location-container");
        locationList.innerHTML = "<h2>" + location.name.toUpperCase() + "</h2>";

        // Render location only if it contains restaurants
        if(location.restaurants.length >= 1) {
            location.restaurants.map(restaurant=> this.renderRestaurant(restaurant, locationList));
            restaurantList.appendChild(locationList);
        }
    }

    renderRestaurant(restaurant, list) {
        let restaurantFound = this.state.restaurants.find( ({ _id }) => _id === restaurant ).name;
        let listElement = document.createElement('li');
        listElement.setAttribute("key", restaurantFound);
        listElement.setAttribute("value", restaurantFound);
        listElement.innerHTML = restaurantFound;
        list.appendChild(listElement);
    }

    render() {
        return <>
            <div className="reslist-content" id="reslist-content">
                {this.state.locations.map(location=> this.renderLocation(location))}
            </div>
        </>
    }

}

export default RestaurantList;
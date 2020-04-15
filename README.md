# Fave Munchies

Fave Munchies is a web app that helps you keep track of your favourite restaurants and where they are located.

## Getting Started

The web app is composed of 3 main components that provide you with the ability to see your restaurant list, add a location, and add a restaurant with certain location to the database.

## Running the tests

Information on how to test the web app.

### Restaurant List

The restaurant list page keeps track of the database documents by location. It will only show locations with restaurants in them so checking by adding a location and no restaurants to it could be a good start.

### Add Location

Locations cannot be duplicated and are escaped and validated to be 1 to 30 characters long. Test for an empty entry and a location that already exists.

It should also add the location in all caps. This can be checked in the restaurant list.

## Add Restaurant

There is no restrictions on duplicate restaurants at any location since there can be multiple restaurants per location. The dropdown of restaurants contain the up to date locations added from the other component without reloading the page, which means if you add a location from a different browser window it should show up right away.

Restaurants also have a 1 to 30 characters cap and will be escaped, validated and capitalized.

## Built With

* [Node](https://nodejs.org/en/docs/) - The server framework used
* [REACT](https://reactjs.org/docs/getting-started.html) - The client side framework used
* [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/) - CSS Management

## Author

* **Allen Vanegas** - [AllenVan64] (https://github.com/AllenVan64)

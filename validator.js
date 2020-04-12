const {check} = require('express-validator');
const validator = require('validator');

/* Validate that the location is not null or 'None' */
const validLocation = location => {
    return ((location != null) && (location != "None"))
}

/* Restaurant sanitization, including capitilazing and escaping */
const checkRestaurant = restaurant => {
    var splitStr = restaurant.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    restaurant = splitStr.join(' ');
    return restaurant;
}

const escapeLocation = location => {
    var name = location.toUpperCase();
    return validator.escape(name);
}

exports.restaurantValidators = [
    check('name', 'Please enter a valid restaurant, it must be between 1 and 30 characters.')
        .not().isEmpty()
        .trim()
        .escape()
        .isLength({min: 1,max: 30})
        .customSanitizer(checkRestaurant),
    check('location', 'Please choose a valid location')
        .not().isEmpty()
        .custom(validLocation)
];

exports.locationValidators = [
    check('name', 'Please enter a valid location, it must be between 1 and 30 characters.')
        .not().isEmpty()
        .trim()
        .escape()
        .isLength({min: 1,max: 30})
        .custom(validLocation)
        .customSanitizer(escapeLocation)
];
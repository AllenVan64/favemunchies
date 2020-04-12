const express = require('express');
const app = express();
const connection = require('./db/connection');

const Restaurant = require('./models/Restaurant');
const Location = require('./models/Location');

const {restaurantValidators} = require('./validator.js');
const {locationValidators} = require('./validator.js')
const {validationResult} = require('express-validator');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

app.get('/app', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
   });

app.get('/restaurants', (req,res)=>{
    Restaurant.find()
    .then(results=>{
        res.status(200).send(results);
    })
    .catch(error=> {
        console.log(error);
        res.status(500).send("Internal server error"); // Error when retreiving data
    })
});

app.get('/locations', (req,res)=>{
    Location.find()
    .then(results=>{
        res.status(200).send(results);
    })
    .catch(error=> {
        console.log(error);
        res.status(500).send("Internal server error"); // Error when retreiving data
    })
});

app.post('/restaurants', restaurantValidators, (req,res)=>{
    const valErrors = validationResult(req).array();
    if(valErrors.length != 0) {
        // Send message from first validation error found
        console.log(valErrors[0].msg)
        res.status(422).send(valErrors[0].msg);
    } else { // Input is valid
        Location.findOne({name: req.body.location})
        .exec()
        .then(locationFound=>{
            const newRestaurant = new Restaurant(req.body);
            // locationFound.restaurants.forEach(restaurant=> {
            //     Restaurant.findOne({_id: restaurant._id})
            //     .exec()
            //     .then(result=> {
            //         // Duplicate found in that location
            //         console.log(result.name == newRestaurant.name)
            //         if(result.name == newRestaurant.name) {
            //             // Error if location already exists in database
            //             return res.status(401).send("Restaurant already exists at that location");
            //         }
            //     })
            //     .catch(error=> {
            //         console.log(error);
            //         return res.status(500).send("Internal server error"); // Error when finding
            //     })
            // });
            newRestaurant.save()
            .then(result=>{
                locationFound.restaurants.push(newRestaurant);
                locationFound.save()
                .then(result=>{
                    res.status(201).send("Restaurant added successfully"); // Success when saving
                })
                .catch(error=> {
                    console.log(error);
                    res.status(500).send("Internal server error"); // Error when saving
                })
            })
            .catch(error=> {
                console.log(error);
                res.status(500).send("Internal server error"); // Error when saving
            })
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send("Internal server error"); // Error when searching
        })
    }
});


app.post('/locations', locationValidators, (req,res, next)=>{
    const valErrors = validationResult(req).array();
    if(valErrors.length != 0) {
        // Send message from first validation error found
        res.status(422).send(valErrors[0].msg);
    } else { // Input is valid
        Location.findOne({name: req.body.name})
        .exec()
        .then(locationFound=>{
            if(locationFound) {
                let error = new Error();
                //next(error);
                // Error if location already exists in database
                res.status(401).send("Location already exists");
            } else {
                const location = new Location(req.body);
                location.save()
                .then(result=>{
                    res.status(201).send("Location added successfully");  // Success when saving
                })
                .catch(error=> {
                    console.log(error);
                    res.status(500).send("Internal server error"); // Error when saving
                })
            }
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send("Internal server error"); // Error when searching
        })
    }
});

connection.once('open', ()=>{
    console.log('connected to db');
        const server = app.listen(8080, ()=>{
        console.log('listening on 8080');
    });
});
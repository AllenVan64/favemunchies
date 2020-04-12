const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name:{type:String, required:true},
    restaurants: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
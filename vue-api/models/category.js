var mongoose = require('../modules/database.js');

var schema = mongoose.Schema({
    name: { type: String, required: true }
});

var Model = mongoose.model('categories', schema);

module.exports = Model;
var mongoose = require('../modules/database');

var schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    articleId: { type: mongoose.Schema.Types.ObjectId, required:true,ref:'artices'}
});


var Model = mongoose.model('collect',schema);

module.exports = Model;
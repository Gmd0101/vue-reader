var mongoose = require('../modules/database.js');

var schema = mongoose.Schema({
    category: { type:String, required: true, ref: 'categories' },
    tags: { type: mongoose.Schema.Types.Array },
    title: { type: String, required: true, match: /^.{2,50}$/ },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    browerCount: { type: Number, default: 0 },
    favoriteCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    lastReplyId: { type: mongoose.Schema.Types.ObjectId, ref: "replies", default: null },
    status: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now() },
    updateTime: { type: Date, default: Date.now() }
});


var Model = mongoose.model('artices', schema);
module.exports = Model;
var mongoose = require('../modules/database.js');

var schema = mongoose.Schema({
    articleId: { type: mongoose.Schema.Types.ObjectId,ref:"artices"},
    content: { type: String, required: true, match: /^.{1,50}$/ },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    agreeCount: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    secondReplyCount: { type: Number, default: 0 },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "replies", default: null },
    createTime: { type: Date, default: Date.now }
});

var Model = mongoose.model("replies", schema);

module.exports = Model;
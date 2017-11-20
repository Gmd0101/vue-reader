var mongoose = require('../modules/database.js');

var schema = mongoose.Schema({
    name: { type: String, require: true, minlength: 2, maxlength: 8 },
    password: { type: String, require: true, match: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/ },
    phone: { type: String, require: true, match: /^1[34578]\d{9}$/ },
    email: { type: String, match: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, default: '123@xx.com' },
    sex: { type: String, default: "男" },
    abstract: { type: String, default: '这个人很懒，什么也没有留下...' },
    logo: { type: String, default: 'images/uploadimg/default.jpg' },
    articleCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    followCount: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now }
});

var Model = mongoose.model('users', schema);

module.exports = Model;
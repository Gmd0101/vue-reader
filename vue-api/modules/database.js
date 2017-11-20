var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/myproject', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', function (err) {
    console.log("数据库连接失败,错误原因:" + err);
});

db.once('open',function(){
    console.log('数据库打开成功');
});

module.exports = mongoose;
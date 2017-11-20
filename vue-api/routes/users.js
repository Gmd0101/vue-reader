var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Category = require('../models/category.js');
var Article = require('../models/articles.js');
var Collect = require('../models/collect.js');
var Reply = require('../models/reply.js');
//上传相关模块
var formidable = require('formidable');
var fs = require('fs');

//注册
router.post('/register', function (req, res, next) {
  var person = {
    name: req.body.name,
    password: req.body.password,
    phone: req.body.phone
    // name:'gmd',
    // password:'123qwe',
    // phone:'15672719136'
  }
  User.findOne({ phone: person.phone }, function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' });
    }
    if (result) {
      res.json({ status: '0', msg: '该手机号已被注册,请直接登录', result: '' });
    } else {
      User.insertMany(person, function (error, doc) {
        if (error) {
          res.json({ status: '0', msg: error.message, result: "" });
        } else {
          res.json({ status: "1", msg: "注册成功", result: doc });
        }
      });
    }
  })
});
//登录
router.post('/login', function (req, res, next) {
  var phone = req.body.phone;
  // var phone = '15672719135';
  // var password = '123qwe';
  var password = req.body.password;
  User.findOne({ phone: phone }, function (err, result) {
    if (err) {
      res.json({ status: '0', msg: err.message, result: "" });
    } else {
      if (!result) {
        res.json({ status: '0', msg: "找不到该账号", result: "" });
      } else {
        if (result.password == password) {
          // console.log(result);
          req.session.user = result._id;
          req.session.save();
          console.log('登录的' + req.session.user);
          res.json({ status: '1', msg: "登录成功", result: result });
        } else {
          res.json({ status: '0', msg: "密码不正确", result: "" });
        }
      }
    }
  });
});
//上传图片
router.post('/upload', function (req, res, next) {

  //处理图片上传逻辑
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  //图片上传的临时路径
  form.uploadDir = 'public/images/upload';
  //保留图片后缀名
  form.keepExtensions = true;
  form.on('file', function (name, file) {
    var newfilename = file.name;
    // console.log(file);
    // console.log(localStorage.msg);
    console.log("___________________________________________");
    var newpath = 'public/images/uploadimg/' + newfilename;
    console.log(newpath);
    fs.rename(file.path, newpath);

    //操作数据库的操作
    var id = req.session.user;
    if (id) {
      console.log("修改的" + id);
      // res.json({status:'1',msg:'获得id',result:"asdfasf"});
    }
    var logo = 'images/uploadimg/' + newfilename;
    console.log('要插入的路径' + logo);
    User.findOneAndUpdate({ _id: id }, { $set: { logo: logo } }, function (error, result) {
      if (error) {
        res.json({ status: '0', msg: error.message, result: '' });
      } else {
        if (result) {
          res.json({ status: '1', msg: '修改成功', result: result });
        } else {
          res.json({ status: '0', msg: '修改失败', result: "" });
        }
      }
    });

  });
  form.parse(req, function (error, fields, files) {
  });

});
//修改信息
router.post('/editmsg', function (req, res, next) {
  var name = req.body.name,
    sex = req.body.sex,
    email = req.body.email,
    abstract = req.body.abstract,
    id = req.body.id,
    updateTime = Date.now();
  User.findByIdAndUpdate(
    { _id: id },
    { $set: { name, sex, email, abstract, updateTime } },
    function (error, result) {
      if (error) {
        res.json({ status: '0', msg: error.message, result: '' });
      }
      if (result) {
        res.json({ status: '1', msg: '修改成功', result: result });
      }
    });
});
//根据id查找个人信息
router.post('/person', function (req, res, next) {
  var id = req.body.personid;
  // var id = '5a09af9f5ade9b44703ee9f6';
  User.findById({ _id: id }).populate('CollectId').exec(function (error, result) {
    if (result) {
      res.json({ status: '1', msg: '查找成功', result: result });
    } else {
      res.json({ status: '0', msg: '查找失败', result: '' });
    }
  });
});
//修改密码
router.post('/pwd', function (req, res, next) {
  var phone = req.body.phone;
  var password = req.body.password;
  console.log(phone);
  console.log(password);
  User.findOneAndUpdate({ phone }, { $set: { password } }, function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' });
    }
    if (result) {
      res.json({ status: '1', msg: '修改成功', result: result });
    } else {
      res.json({ status: '2', msg: '没有此账号', result: '' });
    }
  });
});
//发表文章
router.post('/article', function (req, res, next) {
  var ar = {
    category: req.body.category,
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content
  };

  if (!ar.category || !ar.userId || !ar.title || !ar.content) {
    res.json({ status: '0', msg: '必要内容请填写完整', result: '' });
  }
  Article.insertMany(ar, function (error, doc) {
    if (error) {
      res.json({ status: "0", msg: error.message, result: "" });
    }
    if (doc) {
      res.json({ status: '1', msg: "发表成功", result: doc });
    }
  });
});
//获取所有的文章
router.get('/gainarticle', function (req, res, next) {
  Article.find({}).populate('userId').exec(function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' });
    }
    if (result) {
      res.json({ status: '1', msg: '查询所有文章成功', result: result });
    } else {
      res.json({ status: '0', msg: '查询不到结果', result: '' });
    }
  });
});
//获取文章类别列表
router.get('/cate', function (req, res, next) {
  Category.find({}, function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' });
    } else {
      if (result) {
        res.json({ status: "1", msg: "查找成功", result: result });
      }
    }
  });
});
//查找同一类别的所有文章
router.post('/categorylist', function (req, res, next) {
  var category = req.body.category;
  // var category = '散文';
  Article.find({ category }).populate('userId').exec(function (err, result) {
    if (err) {
      res.json({ status: '0', msg: err.message, result: '' });
    }
    if (result) {
      res.json({ status: '1', msg: "查找成功", result: result });
    } else {
      res.json({ status: '0', msg: "找不到该类别的文章", result: '' });
    }
  });
});
//根据文章id查找文章(文章详情)
router.post('/articledetail', function (req, res, next) {
  console.log(req.body.articleid);
  var id = req.body.articleid;
  console.log(id);
  // var id  = '59fda90eb572fe32a0df5b75';
  Article.findById({ _id: id }).populate('userId').exec(function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' });
    }
    if (result) {
      res.json({ status: '1', msg: '查找成功', result: result });
    } else {
      res.json({ status: '0', msg: '文章不存在', result: '' });
    }
  });
});
//根据用户查找发表的文章
router.post('/userarticle', function (req, res, next) {
  var userId = req.body.userId;
  Article.find({ userId }).populate('userId').exec(function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' });
    }
    if (result) {
      res.json({ status: '1', msg: '查找成功', result: result });
    }
  });
});
//收藏文章
router.post('/articlecollect', function (req, res, next) {
  var userId = req.body.userId;
  var articleId = req.body.articleId;
  console.log(userId + '____' + articleId);
  Collect.findOne({ userId, articleId }, function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' })
    }
    if (result) {
      res.json({ status: '0', msg: '您已收藏过此文章', result: result })
    } else {
      Collect.insertMany({ userId, articleId }, function (error, result) {
        if (error) {
          res.json({ status: '0', msg: error.message, result: '' });
        }
        if (result) {
          res.json({ status: '1', msg: '收藏成功', result: result });
        }
      });
    }
  })

});
//查询收藏文章
router.post('/personalcollect', function (req, res, next) {
  var userId = req.body.userId;
  Collect.find({ userId }).populate('articleId').exec(function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' });
    }
    if (result) {
      res.json({ status: '1', msg: '查找成功', result: result });
    }
  });
});
//修改文章浏览次数
router.post('/brower', function (req, res, next) {
  var id = req.body.articleid;
  Article.findOneAndUpdate({ _id: id }, { $inc: { browerCount: 1 } }, function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.messsage, result: '' });
    }
    if (result) {
      res.json({ status: '1', msg: '浏览次数+1', result: result });
    }
  });
});
//文章评论
router.post('/replies', function (req, res, next) {
  var articleId = req.body.articleId;
  var userId = req.body.userId;
  var content = req.body.content;
  //将评论信息存入表中
  var replyinsert = Reply.insertMany({ articleId, content, userId });
  //文章的回复数增加
  var replycount = Article.findOneAndUpdate({ _id: articleId }, { $inc: { replyCount: 1 } });
  Promise.all([replyinsert, replycount]).then(function (results) {
    res.json({ status: '1', msg: '成功', result: results[0] });
  });
});
//查找文章评论
router.post('/getreplies', function (req, res, next) {
  var articleId = req.body.articleId;
  Reply.find({ articleId }).populate('userId').exec(function (error, result) {
    if (error) {
      res.json({ status: '0', msg: error.message, result: '' });
    }
    if (result) {
      res.json({ status: '1', msg: '查找该文章所有评论成功', result: result });
    }
  });
});

module.exports = router;

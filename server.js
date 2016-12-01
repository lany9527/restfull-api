/**
 * Created by littlestone on 2016/11/30.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./app/models/user');
//用于获取POST数据
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

//打印请求
router.use(function (req, res, next) {
  console.log('Somthing is happening');
  next();
});
//用于测试api工作是否正常
router.get('/', function (req, res) {
  res.json({message: 'Hi, Welcome to our api!'});
});


mongoose.connect('mongodb://localhost:27017/rest');

//新建
router.route('/users')
  .post(function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    })
  })
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    })
  });
//传参查找特定的记录
router.route('/users/:user_id')
  .get(function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    })
  })
  .put(function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
      if (err) {
        res.send(err);
      }
      user.name = req.body.name;
      user.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({message: 'User updated!'})
      })
    })
  })
  .delete(function (req, res) {
    User.remove({_id: req.params.user_id}, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Successfully deleted!'});
    })
  });
//注册路由 所有路由都由/api作为前缀
app.use('/api', router);

//启动服务
app.listen(port);
console.log("server is running on port:" + port);
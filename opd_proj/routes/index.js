const express = require('express');
const router = express.Router();
const server = require('../server/server').index;


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.data);
  res.render('index', {title: 'Express'});
  //res.json({code: "200"});

});

// 系统登陆
router.post('/login', function (req, res, next) {
  console.log(req.body);
  const user = {avatar: "", id: "", name: "", username: ""}
  server.logSys("tb_sys", 's_account', req.body.username, 's_password', req.body.password)
    .then(function (msg) {
      console.log(msg);
      if (1 === msg.length) {
        user.name = msg[0].s_account
        user.username = msg[0].s_name
        res.json({code: 200, user: user, msg: "请求成功"})
      } else {
        res.json({code: 500, msg: "账号或密码错误"})
      }
    })
    .catch(function (msg) {
      console.log(msg);
      res.json({code: 500, msg: "请求失败"});
    });
});

// //////////////////////////////员工管理/////////////////////////////////////////
// 分页查询用户 并获取记录数
router.post('/listpage', function (req, res, next){
  console.log(req.body)
  const result = {total: 0, users: [], departments: []}
  Promise.all([
    server.checkTotalNum('tb_user', 'u_id', 'u_name', req.body.params.name),
    server.checkAllUsers(req.body.params.page, req.body.params.name),
    server.checkAll('tb_department')
  ])
    .then(msgs => {
      result.total = msgs[0]
      result.users = msgs[1]
      result.departments = msgs[2]
      res.json(result)
    })
    .catch(err => {
      console.log(err);
      res.json({code: 500, msg: "请求失败"});
    })
})

// 添加员工
router.post('/addUser', function (req, res, next){
  console.log(req.body)
  server.addUser('tb_user', ['u_jobno', 'u_name', 'd_no', 'u_gender', 'u_flag'], [req.body.params.jobNum, req.body.params.name, req.body.params.d_no, req.body.params.sex, req.body.params.u_flag])
    .then((msg) => {
      console.log(msg);
      res.json({code: 200, msg: "添加部门成功"});
    })
    .catch((msg) => {
      console.log(msg);
      res.json({code: 500, msg: "添加部门失败"});
    })
})

// 删除员工
router.post('/removeUsers', function (req, res, next){
  console.log(req.body)
  server.removeDepartments('tb_user', 'u_jobno', req.body.params.id)
    .then((msg) => {
      console.log(msg);
      res.json({code: 200, msg: "删除员工成功"});
    })
    .catch((msg) => {
      console.log(msg);
      res.json({code: 500, msg: "删除员工失败"});
    })
})

// 更新员工
router.post('/updateUser', function (req, res, next){
  console.log(req.body)
  server.editUser(req.body.params.u_name, req.body.params.u_jobno, req.body.params.d_no, req.body.params.u_gender, req.body.params.u_flag, req.body.params.u_id )
    .then((msg) => {
      console.log(msg);
      res.json({code: 200, msg: "更新员工成功"});
    })
    .catch((msg) => {
      console.log(msg);
      res.json({code: 500, msg: "更新员工失败"});
    })
})


// //////////////////////////////////////////部门管理/////////////////////////////////////////////
// 分页查询用户 并获取记录数
router.post('/listdepartment', function (req, res, next){
  console.log(req.body)
  const result = { total: 0, departments: [] }
  Promise.all([
    server.checkTotalNum('tb_department', 'd_id', 'd_name', req.body.params.name),
    server.checkAllDepartments('tb_department', req.body.params.page, req.body.params.name)
  ])
    .then(msgs => {
      result.total = msgs[0]
      result.departments = msgs[1]
      res.json(result)
  })
    .catch(err => {
      console.log(err);
      res.json({code: 500, msg: "请求失败"});
    })
})

// 新增部门
router.post('/addDepartment', function (req, res, next){
  console.log(req.body)
  server.addDepartment('tb_department', ['d_no', 'd_name'], [req.body.params.d_no, req.body.params.d_name])
    .then((msg) => {
      console.log(msg);
      res.json({code: 200, msg: "添加部门成功"});
    })
    .catch((msg) => {
      console.log(msg);
      res.json({code: 500, msg: "添加部门失败"});
    })
})

// 删除部门
router.post('/removeDepartment', function (req, res, next){
  console.log(req.body)
  server.removeDepartments('tb_department', 'd_no', req.body.params.id)
    .then((msg) => {
      console.log(msg);
      res.json({code: 200, msg: "删除部门成功"});
    })
    .catch((msg) => {
      console.log(msg);
      res.json({code: 500, msg: "删除部门失败"});
    })
})

// 更新部门
router.post('/updateDepartment', function (req, res, next){
  console.log(req.body)
  server.editDepartment(req.body.params.d_no, req.body.params.d_name, req.body.params.d_id)
    .then((msg) => {
      console.log(msg);
      res.json({code: 200, msg: "更新部门成功"});
    })
    .catch((msg) => {
      console.log(msg);
      res.json({code: 500, msg: "更新部门失败"});
    })
})

// /////////////////////////报修记录管理////////////////////////////////
router.post('/listService', function (req, res, next) {
  const result = {total: 0, repairs: []}
  console.log(req.body)
  Promise.all([
    server.checkTotalServicesNum( 'u_name', '', req.body.params.name),
    server.checkRepairs('u_name', req.body.params.page, req.body.params.name),
  ])
    .then(msgs => {
      console.log(msgs[1]);
      result.total = msgs[0]
      result.repairs = msgs[1]
      res.json(result)
    })
    .catch(err => {
      console.log(err);
      res.json({code: 500, msg: "请求失败"})
    })
})

// 删除报修记录
router.post('/removeRepairs', function (req, res, next){
  console.log(req.body)
  server.removeDepartments('tb_service', 's_id', req.body.params.id)
    .then((msg) => {
      console.log(msg);
      res.json({code: 200, msg: "删除报修记录成功"});
    })
    .catch((msg) => {
      console.log(msg);
      res.json({code: 500, msg: "删除报修记录失败"});
    })
})

module.exports = router;

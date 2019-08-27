//users路由
var express = require('express');
var router = express.Router();
var getUload = require('../handleUploads/handleUpload');
var server = require('../server/server');
// var upload = multer({ dest: 'uploads/'}) // 文件储存路径
// upload.single('file')//中的参数是post提交的文件的key

let path = 'uploads';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//上传报修附件，并将附件地址存入数据库 !!!
router.post('/uploadImage', getUload(path), function(req, res, next) {
  console.log(req.body);
  console.log(req.file);
  let sid = req.body.insertId;
  let url = `http://111.230.184.6:8000/uploads/${req.file.filename}`;
  let isImg = ('video/mp4' == req.file.mimetype ? 0:1);
  server.addImgUrl('tb_annex', ['s_id', 'a_url', 'a_isImg'], [sid, url, isImg])
  .then(function(msg){
    res.json({message: "ok", insertId: msg.insertId});
    console.log(msg);
  })
  .catch(function(msg){
    res.json({message: "fail"});
    console.log(msg);});
});

//提交报修请求 !!!
router.post('/repair',  function(req, res, next) {
  //console.log(req.body);
  let arr1 = ['u_jobno', 's_type', 's_date', 's_msg'];
  let arr2 = [req.body.jobNo, req.body.malfunctionNo, req.body.date, req.body.detailMsg];
  server.addRepairMsg('tb_service', arr1, arr2)
  .then(function(msg){
    res.json({message: "ok", insertId: msg.insertId});
    //console.log('success');
    console.log(msg);
  })
  .catch(function(msg){
    res.json({message: "fail"});
    //console.log('fail');
    console.log(msg);});
});


//发送留言记录 !!!
router.post('/sendDialog',  function(req, res, next) {
  console.log(req.body);
  server.addDialog('tb_dialog', ['s_id', 'u_jobno', 'da_msg', 'da_date'], [req.body.sid, req.body.jobNo, req.body.dialog, req.body.date])
  .then(function(msg){
    console.log(msg);
    return server.showDialogs(req.body.sid);
  }).then(function (msg){
    console.log(msg);
    res.json({message: msg});})
  .catch(function(msg){
    console.log(msg);
    res.json({message: "fail"});});
});

//////////////////////////查询///////////////////////////////////////////////////

//获取报修记录!!!
router.post('/getMsg',  function(req, res, next) {
  console.log(req.body);
  let jobNo = req.body.jobNo;
  server.showRecords(jobNo)
  .then(function(msg){
    console.log(msg);
    res.json({message: msg});})
  .catch(function(msg){
    console.log(msg);
    res.json({message: "fail"});});

});

//获取报修附件!!!
router.post('/getAnnex',  function(req, res, next) {
  console.log(req.body);
  let sid = req.body.sid;
  console.log(sid);
  server.showAnnex('tb_annex', ['a_url', 'a_isImg'], 's_id', sid)
  .then(function(msg){
    console.log(msg);
    res.json({message: msg});})
  .catch(function(msg){
    console.log(msg);
    res.json({message: "fail"});});

});

//获取留言记录
router.post('/getDialogs',  function(req, res, next) {
  console.log(req.body);
  let sid = req.body.sid;
  console.log(sid);
  server.showDialogs(sid)
  .then(function(msg){
    console.log(msg);
    res.json({message: msg});})
  .catch(function(msg){
    console.log(msg);
    res.json({message: "fail"});});
});



module.exports = router;

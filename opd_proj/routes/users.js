//users路由
var express = require('express');
var router = express.Router();
var getUload = require('../handleUploads/handleUpload');
var server = require('../server/server');
// var upload = multer({ dest: 'uploads/'}) // 文件储存路径
// upload.single('file')//中的参数是post提交的文件的key

let path = 'uploads';



router.post('/uploadImage', getUload(path), function(req, res, next) {
  console.log(req.body);
  res.json({message: "ok"});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/repair',  function(req, res, next) {
  console.log(req.body);
  let arr1 = ['u_jobno', 's_type', 's_date', 's_msg'];
  let arr2 = [req.body.jobNo, req.body.malfunctionNo, `'${req.body.date}'`, `'${req.body.detailMsg}'`];
  server.addRepairMsg('tb_service', arr1, arr2)
  .then(function(msg){
    res.json({message: "ok"});
    console.log(msg);})
  .catch(function(msg){
    res.json({message: "fail"});
    console.log(msg);});
  
  // server.showRecords('tb_user', 'tb_service', ['tb_user.*'], ['tb_service.*'], 'tb_user.u_jobno = tb_service.u_jobno', 'tb_service.u_jobno = "1001"')
  // .then(function(msg){
  //   console.log(msg);
  //   res.json({message: "ok"});})
  // .catch(function(msg){res.json({message: "fail"});});

});

router.post('/getMsg',  function(req, res, next) {
  console.log(req.body);
  let jobNo = req.body.jobNo;
  server.showRecords('tb_user', 'tb_service', 'tb_department', ['tb_user.*'], ['tb_service.*'], ['tb_department.*'], 'tb_user.u_jobno = tb_service.u_jobno', 'tb_department.d_no = tb_user.d_no',  `tb_service.u_jobno = "${jobNo}"`)
  .then(function(msg){
    console.log(msg);
    res.json({message: msg});})
  .catch(function(msg){res.json({message: "fail"});});

});




module.exports = router;

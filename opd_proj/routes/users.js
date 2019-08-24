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
  console.log(req.file);
  let sid = req.body.insertId;
  let url = `http://111.230.184.6:8000/uploads/${req.file.filename}`;
  server.addImgUrl('tb_annex', ['s_id', 'a_url'], [`'${sid}'`, `'${url}'`])
  .then(function(msg){
    res.json({message: "ok", insertId: msg.insertId});
    console.log(msg);
  })
  .catch(function(msg){
    res.json({message: "fail"});
    console.log(msg);});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/repair',  function(req, res, next) {
  //console.log(req.body);
  let arr1 = ['u_jobno', 's_type', 's_date', 's_msg'];
  let arr2 = [req.body.jobNo, req.body.malfunctionNo, `'${req.body.date}'`, `'${req.body.detailMsg}'`];
  server.addRepairMsg('tb_service', arr1, arr2)
  .then(function(msg){
    res.json({message: "ok", insertId: msg.insertId});
    console.log(msg);
  })
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
  server.showRecords('tb_user', 'tb_service', 'tb_department', ['tb_user.*'], ['tb_service.*'], ['tb_department.*'], 'tb_user.u_jobno = tb_service.u_jobno', 'tb_department.d_no = tb_user.d_no',  
  `tb_service.u_jobno = "${jobNo}" order by tb_service.s_id desc`)
  .then(function(msg){
    console.log(msg);
    res.json({message: msg});})
  .catch(function(msg){res.json({message: "fail"});});

});




module.exports = router;

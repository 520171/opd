//users路由
var express = require('express');
var router = express.Router();
var getUload = require('../handleUploads/handleUpload');
var server = require('../server/server');

//var upload = multer({ dest: 'uploads/'}) // 文件储存路径
//upload.single('file')中的参数是post提交的文件的key



router.post('/uploadImage', getUload('bbb').single('file'), function(req, res, next) {
  console.log(req.body);
  res.json({message: "ok"});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/msg',  function(req, res, next) {
  server.addRepairMsg('tb_service', ['u_jobno', 's_type', 's_date', 's_msg'], [1001, 1, '123456789', "'asddsadaffacfca'"]);
  
  console.log(req.body);
  res.json({message: "ok"});
});

module.exports = router;

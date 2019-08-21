//users路由
var express = require('express');
var router = express.Router();
var getUload = require('../handleUploads/handleUpload.js');
//var upload = multer({ dest: 'uploads/'}) // 文件储存路径
//upload.single('file')中的参数是post提交的文件的key

router.post('/uploadImage', getUload('bbb').single('file'), function(req, res, next) {
  console.log(req.formData);
  res.json({message: "ok"});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

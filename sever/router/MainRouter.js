const express = require('express')
const fs = require("fs")
let router = express.Router();

router.get("/",function(req,res) {
    res.send('Hello World!')
})

// 上传图片
router.post("/upload", (req, res) => {
    //检测是否有文件
    if (!req.body.files) {
      res.send({
        code: 400,
        msg: "上传文件不能为空",
      });
      return;
    }
    fs.writeFile(process.cwd() + '/public/upload/1.jpg', req.body.files.content, 'binary', (err) => {
      if (err) {
        console.log('写入文件错误')
        res.send({
          code: 500,
          msg: "写入文件错误"
        });
      } else {
        console.log('写入文件成功')
        res.send({
          code: 200,
          msg: "ok"
        });
      }
    })
    // //保存文件
    // let files = [req.body.files.content];
    // let ret_files = [];
    // for (let file of files) {
    //   //获取名字后缀
    //   let file_ext = file.originalname.substring(file.originalname.lastIndexOf(".") + 1);
    //   //使用时间戳作为文件名字
    //   let file_name = new Date().getTime() + "." + file_ext;
    //   // 移动文件并且修改文件名字
    //   fs.renameSync(
    //     process.cwd() + "/public/upload/temp/" + file.filename,
    //     process.cwd() + "/public/upload/" + file_name
    //   );
    //   ret_files.push("/public/upload/" + file_name);
    // }
  
    
  
});

  
//下载文件
router.get("/download", async (req, res) => {
    let file_name = req.query.file_name;
    let file_path = process.cwd() + "/public/upload/" + file_name;
    res.download(file_path);
})

module.exports = router;
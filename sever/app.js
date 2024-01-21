//基础配置
const express = require('express')
const app = express()
const port = 8080
const path = require("path")
const multer = require("multer")

const bodyParser = require('body-parser');
app.use(bodyParser.json({ "limit": "20mb" }));
// 配置解析 application/x-www-form-urlencoded 格式的中间件
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

const upload = multer({
    dest: "./public/upload/temp",
});
//所有接口都允许有上传功能
app.use(upload.any());

//json解析
app.use(express.json())
//静态文件访问
app.use(express.static(path.join(__dirname, "public")))

//总的中间件
app.use(function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
    else next();
});

//路由管理器
// app.get -------- 查询
// app.post ----------- 新增
// app.put ------------------ 改
// app.delete ------------ 删除
app.use("/", require("./router/MainRouter"))
app.use("/db", require("./router/DbRouter"))
app.use("/admin", require("./router/AdminRouter"))
app.use("/user", require("./router/UserRouter"))
app.use("/article", require("./router/ArticleRouter"))
// req.baseUrl ---- 基础路径
// req.body ---- body里面的内容
// req.hostname ---- 域名
// req.ip ---- 访问IP
// req.method ---- 请求方法get/post/put/delete
// req.originalUrl ---- 原始路径
// req.params ---- 获取属性 req.params.name
// req.path ---- 获取路径
// req.protocol ---- 请求协议
// req.query ---- 获取query属性
// req.route ---- 获取route信息

// res.redirect --- 重定向


//监听打开
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
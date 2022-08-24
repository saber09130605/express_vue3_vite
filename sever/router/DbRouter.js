const express = require('express')
const fs = require("fs")
const table = require("../db/table.js")
let router = express.Router();


// 新增
// router.post("/add",(req,res)=>{
//     let json_body = req.body;
//     let insert_sql = "INSERT INTO `user` (`id`,`name`,`age`,`create_time`) VALUES ( ?, ?, ?, ? );"
//     let create_time = new Date().getTime()
//     db.run(insert_sql,[json_body.id,json_body.name,json_body.age,create_time],(err,rows)=>{
//         if(err == null){
//             res.send("执行成功");
//         }else{
//             res.send(err)
//         }
//     })
// })

//查询
router.get("/userlist",async (req,res) => {
    let { err, rows } = await table.getRowsByKey("admin","account","admin");
    res.send(rows)
})


module.exports = router;
const express = require('express');
const router = express.Router();
const table = require("../db/table.js");
const { v4: uuidv4 } = require("uuid");
const checkResults = require("../utils/Check");
const ResultCode = require("../utils/ResultCode");
// 注册
router.post("/create", async (req, res) => {
    let { account, password } = req.body;
    let resultcode = checkResults.checkUser(account, password)
    if (resultcode.code > 500) {
        res.send(resultcode)
        return
    }
    let { err, rows } = await table.getRowsByKey("user","account",account);
    if (err == null && rows.length > 0) {
        res.send(ResultCode.USER_HAS)
    } else {
        let token = uuidv4();
        let param = {
            account,
            password,
            create_time: new Date().getTime(),
            name: account,
            token,
            headPortrait:""
        }
        await table.addRow("user",param)
        let { err, rows } = await table.getRowsByKey("user","account",account);
        let user_info = rows[0];
        let sendObj = ResultCode.CREATE_SUCCESS;
        sendObj.data = user_info;
        res.send(sendObj);
    }
})

// 登录
router.post("/login", async (req, res) => {
    let { account, password } = req.body;
    let resultcode = checkResults.checkUser(account, password)
    if (resultcode.code > 500) {
        res.send(resultcode)
        return
    }

    let { err, rows } = await table.getRowsByKey("user",["account","password"],[account, password]);
    if (err == null && rows.length > 0) {
        let login_token = uuidv4();
        await table.setRowValue("user",{token : login_token},{id:rows[0].id})
        let user_info = rows[0]
        user_info.token = login_token;
        let sendObj = ResultCode.LOGIN_SUCCESS;
        sendObj.data = user_info;
        res.send(sendObj);
    } else {
        res.send(ResultCode.LOGIN_ERROR);
    }
})
//自动登录
router.post("/autoLogin", async (req, res) => {
    let { account, token } = req.body;

    let { err, rows } = await table.getRowsByKey("user",["account","token"],[account, token]);
    if (err == null && rows.length > 0) {
        let login_token = uuidv4();
        await table.setRowValue("user",{token : login_token},{id:rows[0].id})
        let user_info = rows[0]
        user_info.token = login_token
        user_info.password = ""
        let sendObj = ResultCode.LOGIN_SUCCESS;
        sendObj.data = user_info;
        res.send(sendObj);
    } else {
        res.send(ResultCode.LOGIN_ERROR);
    }
})
// 退出登录
router.post("/outLogin", async (req, res) => {
    let { account, password } = req.body;
    let { err, rows } = await table.getRowsByKey("user",["account","password"],[account, password]);
    if (err == null && rows.length > 0) {
        let login_token = "";
        await table.setRowValue("user",{token : login_token},{id:rows[0].id})
        let sendObj = ResultCode.OUT_LOGIN_SUCCESS;
        res.send(sendObj);
    } else {
        res.send(ResultCode.LOGIN_ERROR);
    }
})

router.get("/userName", async (req, res) => {
    let { id } = req.query;
    let { err, rows } = await table.getRowsByKey("user","id",id)
    if (err) {
        res.send({
            err,
            msg:"失败"
        })
    } else {
        res.send({
            data:{
                name:rows[0].name
            },
            msg:"成功"
        })
    }
})
module.exports = router;
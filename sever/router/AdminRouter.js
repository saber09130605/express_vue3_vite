const express = require('express');
const router = express.Router();
const table = require("../db/table.js");
const { v4: uuidv4 } = require("uuid");

router.post("/login", async (req, res) => {

    let { account, password } = req.body;
    let { err, rows } = await table.getRowsByKey("admin",["account","password"],[account, password]);
    if (err == null && rows.length > 0) {

        let login_token = uuidv4();
        // let update_token_sql = "UPDATE `admin` SET `token` = ? where `id` = ?"

        // await db.async.run(update_token_sql,[login_token,rows[0].id])
        await table.setRowValue("admin",{token : login_token},{id:rows[0].id})
        let admin_info = rows[0]
        admin_info.token = login_token
        admin_info.password = ""

        res.send({
            code: 200,
            msg: "登录成功",
            data:admin_info
        })
    } else {
        res.send({
            code: 500,
            msg: "登录失败",
            err
        })
    }
})

module.exports = router;
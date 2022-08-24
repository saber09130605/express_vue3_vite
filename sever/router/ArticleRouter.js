const express = require('express');
const router = express.Router();
const table = require("../db/table.js");
const { v4: uuidv4 } = require("uuid");

router.get("/typelist", async (req, res) => {
    let { err, rows } = await table.getTable("articleType")
    res.send({
        data:rows
    })
})
router.get("/articlecontent", async (req, res) => {
    let { id } = req.query;
    let { err, rows } = await table.getRowsByKey("articleContent","id",id)
    if (err) {
        res.send({
            err,
            msg:"失败"
        })
    } else {
        res.send({
            data:rows[0],
            msg:"成功"
        })
    }
})
router.get("/articlelist", async (req, res) => {
    let { type } = req.query;
    let pErr,pRows
    if (type == 0 || type == undefined) {
        let { err, rows } = await table.getTable("articleContent")
        pErr = err
        pRows = rows
    } else {
        let { err, rows } = await table.getRowsByKey("articleContent","type",type)
        pErr = err
        pRows = rows
    }
    if (pErr) {
        res.send({
            err,
            msg:"失败"
        })
    } else {
        res.send({
            data:pRows,
            msg:"成功"
        })
    }
})
router.get("/articleimg", async (req, res) => {
    let { owner } = req.query;
    let { err, rows } = await table.getRowsByKey("articleImg","owner",owner)
    if (err) {
        res.send({
            err,
            msg:"失败"
        })
    } else {
        res.send({
            data:rows,
            msg:"成功"
        })
    }
})

router.post("/postarticle", async (req, res) => {
    let { owner, type, content, cover,title } = req.body;
    let param = {
        owner,
        content,
        create_time: new Date().getTime(),
        type,
        cover,
        title
    }
    let { err, rows,id } = await table.addRow("articleContent",param)
    if (err == null) {
        let ImgParam = {
            owner:id,
            img:cover
        }
        await table.addRow("articleImg",ImgParam)
        res.send({
            data:{
                articleId:id
            },
            msg:"添加成功"
        })
    } else {
        res.send({
            msg:"添加失败"
        })
    }
})

router.post("/postarticleimg", async (req, res) => {
    let { owner,img } = req.body;
    let ImgParam = {
        owner,
        img
    }
    let { err, rows,id } = await table.addRow("articleImg",ImgParam)
    if (err == null) {
        res.send({
            msg:"添加成功"
        })
       
    } else {
        res.send({
            msg:"添加失败"
        })
    }
})
module.exports = router;
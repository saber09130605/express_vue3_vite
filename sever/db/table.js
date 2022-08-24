//导入模块
var sqlite3 = require("sqlite3").verbose();
//指定数据库文件位置
const path = require("path")
var db = new sqlite3.Database( path.join(__dirname,"../db/gzw.sqlite3") );

const GenId = require("../utils/SnowFlake")
const genid = new GenId({ WorkerId: 1 })
// genid.NextId()


const table = {
    getTable:function(_tableName) {
        let promise = new Promise((resolve, reject) => {
            db.all("select * from `" + _tableName + "`",[],(err,rows)=>{
                resolve({ err, rows })
            })
        })
        return promise;
    },
    addRow:(_tableName, _paramObj) => {
        let keyLength = Object.keys(_paramObj).length
        if (keyLength == 0) {
            return
        }
        _paramObj.id = genid.NextId();
        let pid = _paramObj.id
        let sql = "INSERT INTO `" + _tableName + "`(";
        let sqlVal = "(";
        // (`id`,`title`,`content`,`create_time`) VALUES(?,?,?,?)"
        let paramValue = [];
        let index = 0;
        for (let key in _paramObj) {
            if(index > 0) {
                sql = sql + ",";
                sqlVal = sqlVal + ","
            }
            sql = sql +  "`"+ key +"`";
            sqlVal = sqlVal + "?"
            paramValue.push(_paramObj[key])
            index++;
        }
        sql = sql + ")" + " VALUES" + sqlVal + ")";
        let promise = new Promise((resolve, reject) => {
            db.run(sql, paramValue,(err,rows)=>{
                resolve({ err, rows, id:pid })
            })
        })
        return promise;
    },
    getRowsByKey:(_tableName,_keyNames,_keyValue) => {
        let sqlKeysString = "";
        if (!(_keyNames instanceof Array)) {
            _keyNames = [_keyNames]
        }
        if (!(_keyValue instanceof Array)) {
            _keyValue = [_keyValue]
        }
        for (let index = 0; index < _keyNames.length; index++) {
            if (index > 0) {
                sqlKeysString = sqlKeysString + " AND ";
            }
            sqlKeysString = sqlKeysString + "`" + _keyNames[index].toString() + "` = ?";
        }
        
        let promise = new Promise((resolve, reject) => {
            db.all("select * from `" + _tableName + "` where "+ sqlKeysString, _keyValue,(err,rows)=>{
                resolve({ err, rows })
            })
        })
        return promise;
    },
    
    setRowValue:(_tableName,_setObj,_findObj) => {
        // "UPDATE `admin` SET `token` = ? where `id` = ?"
        let valueArray = [];

        let setString = "";
        for (let key in _setObj) {
            setString = setString +  "`"+ key +"` = ?"
            valueArray.push(_setObj[key])
        }

        let findString = "";
        for (let key in _findObj) {
            if (findString.length > 0) {
                findString = findString + " AND ";
            }
            findString = findString +  "`"+ key +"` = ?"
            valueArray.push(_findObj[key])
        }

        let promise = new Promise((resolve, reject) => {
            db.run("UPDATE `" + _tableName + "` SET "+setString+" where "+ findString, valueArray,(err,rows)=>{
                resolve({ err, rows })
            })
        })
        return promise;
    }
}

module.exports = table
let ResultCode = {
    SUCCESS:{code:200,msg:"操作成功"},
    CREATE_SUCCESS:{code:201,msg:"注册成功"},
    LOGIN_SUCCESS:{code:202,msg:"登录成功"},
    OUT_LOGIN_SUCCESS:{code:203,msg:"登出成功"},


    ACCOUNT_IS_EMPTY:{code:501,msg:"请输入账号"},
    ACCOUNT_LENGTH_ERROR:{code:502,msg:"账号长度在 3 到 12 个字符"},
    PASSWORD_IS_EMPTY:{code:503,msg:"请输入密码"},
    PASSWORD_LENGTH_ERROR:{code:504,msg:"密码长度在 6 到 18 个字符"},
    USER_HAS:{code:505,msg:"已有该账号"},
    LOGIN_ERROR:{code:506,msg:"登录失败"}
}


module.exports = ResultCode;
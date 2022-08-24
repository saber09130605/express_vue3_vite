const ResultCode = require("./ResultCode");
let checkResults = {
    checkUser:(account,password) => {
        if (account.length == 0) {
            return ResultCode.ACCOUNT_IS_EMPTY;
        }
        if(account.length < 3 || account.length > 12) {
            return ResultCode.ACCOUNT_LENGTH_ERROR;
        }
        if (password.length == 0) {
            message.error(rules.password[0].message)
            return ResultCode.PASSWORD_IS_EMPTY;
        }
        if(password.length < 6 || password.length > 18) {
            return  ResultCode.PASSWORD_LENGTH_ERROR;
        }
        return ResultCode.SUCCESS;
    }
}
module.exports = checkResults;
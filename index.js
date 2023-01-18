const mysql = require('mysql');



function MysqlPoolCilent(options) {
    this._cilent = mysql.createPool(options)
}

module.exports = MysqlPoolCilent


MysqlPoolCilent.prototype.query = function query(sql, values, callback = undefined) {

    if (callback && typeof callback == 'function') {
        this._cilent.getConnection(function (err, connection) {
            if (err) {
                connection.release()
                callback(err)
            } else {
                connection.query(sql, values, (err, result, fields) => {
                    connection.release()
                    callback(err, result, fields)
                })
            }
        })
    } else {

        return new Promise((resolve, reject) => {

            this._cilent.getConnection(function (err, connection) {
                if (err) {
                    connection.release()
                    reject(err)
                }
                connection.query(sql, values, (err, result, fields) => {
                    connection.release()
                    if (err)
                        reject(err)
                    else
                        resolve(result)
                })

            })

        })
    }
}








exports.commentById = function(connection, res, cid) {
    connection.query("SELECT text FROM comment WHERE cid=?", cid, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.addComment = function(connection, res, query) {
    connection.query(`INSERT INTO comment SET ?`, query, (err, result, fields) => {
        res.send(String(result.insertId))
    })
}

exports.addUserToComment = function(connection, res, query, uid) {
    connection.query(`INSERT INTO uc SET userId=${uid}, commentId=${query.cid}`, (err, result, fields) => {
        res.send("success")
    })
}

exports.addCommentToAnswer = function(connection, res, query) {
    connection.query(`INSERT INTO ac SET ?`, query, (err, result, fields) => {
        res.send("success")
    })
}

exports.addCommentToQuestion = function(connection, res, query) {
    connection.query(`INSERT INTO qc SET ?`, query, (err, result, fields) => {
        res.send("success")
    })
}
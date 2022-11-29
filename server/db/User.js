exports.addUser = function(connection, res, user) {
    connection.query(`SELECT * FROM user WHERE email="${user.email}" OR username="${user.username}"`, (err, rows, fields) => {
        if(rows.length > 0) {res.send(false)} else {
            connection.query("INSERT INTO user SET ?", user, (err, rows, fields) => {
                res.send(rows)
            })
        }
    })
}

exports.getUser = function(connection, res, uid) {
    connection.query(`SELECT * FROM user WHERE uid=${uid}`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getUserFromCommentId = function(connection, res, cid) {
    connection.query(`SELECT username FROM uc INNER JOIN user ON userId=user.uid WHERE commentId=${cid}`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getUserFromAnswerId = function(connection, res, aid) {
    connection.query(`SELECT * FROM ua INNER JOIN user ON userId=user.uid WHERE ansId=${aid}`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getUserFromQuestionId = function(connection, res, qid) {
    connection.query(`SELECT * FROM uq INNER JOIN user ON userId=user.uid WHERE qstnId=${qid}`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getPassFromUsername = function(connection, res, email) {
    connection.query(`SELECT * FROM user WHERE email="${email}"`, (err, rows, fields) => {
        res(rows)
    })
}

exports.updateReputation = function(connection, res, query) {
    connection.query(`UPDATE user SET reputation = reputation + ${query.reputation} WHERE uid = ${query.uid}`, (err, rows, fields) => {
        res.send("success")
    })
}

exports.getReputation = function(connection, res, uid) {
    connection.query(`SELECT reputation FROM user WHERE uid=${uid}`, (err, rows, fields) => {
        res.send(rows)
    })
}






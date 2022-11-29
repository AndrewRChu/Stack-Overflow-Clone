// Answer-related queries
exports.getAll = function(connection, res) {
    connection.query("SELECT * from answer", (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getAnswer = function(connection, res, aid) {
    connection.query(`SELECT * from answer WHERE aid=${aid}`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getComments = function(connection, res, aid) {
    connection.query(`SELECT cid, text FROM ac INNER JOIN comment ON commentId=comment.cid WHERE ansId=?`, aid, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getAnswersFromUserId = function(connection, res, uid) {
    connection.query(`SELECT * from answer WHERE aid IN (SELECT ansId FROM ua WHERE userId=${uid})`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.addUserToAnswer = function(connection, res, ansId, uid) {
    connection.query(`INSERT INTO ua SET userId=${uid}, ansId=${ansId}`, (err, result, fields) => {
        res.send("success")
    })
}

exports.addAnswer = function(connection, res, answer) {
    connection.query("INSERT INTO answer SET ?", answer, (err, result, fields) => {
        res.send(String(result.insertId))
    })
}

exports.updateVotes = function(connection, res, query) {
    connection.query(`UPDATE answer SET votes = votes + ${query.votes} WHERE aid = ${query.aid}`, (err, result, fields) => {
        res.send(query)
    })
}

exports.updateInfo = function(connection, res, query) {
    connection.query(`UPDATE answer SET text = "${query.text}" WHERE aid = ${query.aid}`, (err, result, fields) => {
        res.send(query)
    })
}

exports.getVotes = function(connection, res, aid) {
    connection.query(`SELECT votes FROM answer WHERE aid = ${aid}`, (err, rows, fields) => {
        res.send(rows)
    })
}
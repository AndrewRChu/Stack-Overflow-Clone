// Tag related queries
exports.getAll = function(connection, res) {
    connection.query("SELECT * from tag", (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getTag = function(connection, res, tid) {
    connection.query(`SELECT * from tag WHERE tid=${tid}`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.addTag = function(connection, res, query) {
    connection.query(`INSERT INTO tag SET ?`, query, (err, result, fields) => {
        res.send(String(result.insertId))
    })
}

exports.getQuestions = function(connection, res, tid) {
    connection.query(`SELECT * from question WHERE qid in (SELECT qstnId from qt WHERE tagId = ${tid})`, (err, rows, fields) => {
        res.send(rows)
    })
}


exports.getTagsFromUserId = function(connection, res, uid) {
    connection.query(`SELECT name from tag WHERE tid in (SELECT tagId from qt WHERE qstnId in (SELECT qstnId FROM uq WHERE userId=${uid}))`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getTagsCreatedByUserId = function(connection, res, uid) {
    connection.query(`SELECT * from tag WHERE tid IN (SELECT tagId FROM ut WHERE userId=${uid})`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.tagByName = function(connection, res, name) {
    connection.query("SELECT * from tag WHERE name = ?", name, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.updateInfo = function(connection, res, query) {
    connection.query(`UPDATE tag SET name = "${query.name}" WHERE tid = ${query.tid}`, (err, result, fields) => {
        res.send(query)
    })
}
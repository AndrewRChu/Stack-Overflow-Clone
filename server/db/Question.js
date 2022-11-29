// Question-related Queries
exports.getAll = function(connection, res) {
    connection.query("SELECT * from question ORDER BY ask_date_time ASC", (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getQuestion = function(connection, res, qid) {
    connection.query(`SELECT * from question WHERE qid=${qid}`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getAllIds = function(connection, res) {
    connection.query("SELECT qid from question", (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getTags = function(connection, res, qid) {
    connection.query(`SELECT * from tag WHERE tid in (SELECT tagId from qt WHERE qstnId = ${qid})`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getQuestionsFromSearch = function(connection, res, tags, words) {
    if (tags.length == 0) {tags = "NULL"}
    if (words.length == 0) {words = "NULL"} else {words = `\"${words}\"`}
    connection.query(`
    SELECT * from question WHERE qid IN (
        SELECT qstnId as qid from qt WHERE tagId IN (SELECT tid FROM tag WHERE name IN (${tags}))
        UNION DISTINCT
        SELECT qid FROM question WHERE title REGEXP ${words}
    ) ORDER BY ask_date_time DESC`,
    (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getAnswers = function(connection, res, qid) {
    connection.query(`SELECT * from answer WHERE aid in (SELECT ansId from qa WHERE qstnId = ${qid})`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getComments = function(connection, res, aid) {
    connection.query(`SELECT cid, text FROM qc INNER JOIN comment ON commentId=comment.cid WHERE qstnId=?`, aid, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.getQuestionsFromUserId = function(connection, res, uid) {
    connection.query(`SELECT * from question WHERE qid IN (SELECT qstnId FROM uq WHERE userId=${uid})`, (err, rows, fields) => {
        res.send(rows)
    })
}

exports.addQuestion = function(connection, res, query) {
    connection.query(`INSERT INTO question SET ?`, query, (err, result, fields) => {
        res.send(String(result.insertId))
    })
}

exports.addUserToQuestion = function(connection, res, qstnId, uid) {
    connection.query(`INSERT INTO uq SET userId=${uid}, qstnId=${qstnId}`, (err, result, fields) => {
        res.send("success")
    })
}

exports.addAnswer = function(connection, res, query) {
    connection.query(`INSERT INTO qa SET ?`, query, (err, result, fields) => {
        res.send(result)
    })
}

exports.addTag = function(connection, res, query) {
    connection.query(`INSERT INTO qt SET ?`, query, (err, result, fields) => {
        res.send(String(result.insertId))
    })
}

exports.createAndAddTagToQuestion = function(connection, res, query, uid) {
    connection.query("SELECT * from tag WHERE name = ?", query.tagName, (err, rows, fields) => {
        if (rows.length > 0) {
            // Tag already exists
            connection.query("INSERT INTO qt SET ?", {qstnId: query.qstnId, tagId: rows[0].tid}, (err, result, fields) => {
                res.send(String(result.insertId))
            })
        } else {
            // Need to create a new tag
            connection.query(`INSERT INTO tag SET ?`, {name: query.tagName}, (err, result, fields) => {
                connection.query("INSERT INTO ut SET ?", {userId: uid, tagId: String(result.insertId)}, (err, result2, fields) => {
                    connection.query("INSERT INTO qt SET ?", {qstnId: query.qstnId, tagId: String(result.insertId)}, (err, result3, fields) => {
                        res.send(String(result3.insertId))
                    })
                })
            })
        }
    })
}

exports.updateViews = function(connection, res, query) {
    connection.query(`UPDATE question SET views = views + 1 WHERE qid = ?`, query.id, (err, result, fields) => {
        res.send(query)
    })
}

exports.updateVotes = function(connection, res, query) {
    connection.query(`UPDATE question SET votes = votes + ${query.votes} WHERE qid = ${query.qid}`, (err, result, fields) => {
        res.send(query)
    })
}

exports.updateInfo = function(connection, res, query) {
    connection.query(`UPDATE question SET title = "${query.title}", text = "${query.text}" WHERE qid = ${query.qid}`, (err, result, fields) => {
        res.send(query)
    })
}

exports.getVotes = function(connection, res, qid) {
    connection.query(`SELECT votes FROM question WHERE qid = ${qid}`, (err, rows, fields) => {
        res.send(rows)
    })
}

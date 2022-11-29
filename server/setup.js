// //MySQL Schema setup if using MySQL

let userArgs = process.argv.slice(2)
var mysql = require("mysql")
var connection = mysql.createConnection({
    host: "localhost",
    user: userArgs[1],
    password: userArgs[3],
    database: "fake_so"
})

let question = `
    CREATE TABLE question (
        qid INT AUTO_INCREMENT,
        title VARCHAR(50),
        text VARCHAR(9999),
        views INT DEFAULT 0,
        votes INT DEFAULT 0,
        ask_date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (qid)
    );
`
let answer = `
    CREATE TABLE answer (
        aid INT AUTO_INCREMENT,
        text VARCHAR(9999),
        votes INT DEFAULT 0,
        ans_date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (aid)
    );
`
let tag = `
    CREATE TABLE tag (
        tid INT AUTO_INCREMENT,
        name VARCHAR(999),
        PRIMARY KEY (tid)
    );
`
let user = `
    CREATE TABLE user (
        uid INT AUTO_INCREMENT,
        email VARCHAR(999),
        username VARCHAR(15),
        password VARCHAR(999),
        reputation INT DEFAULT 0,
        creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (uid)
    );
`
let comment = `
    CREATE TABLE comment (
        cid INT AUTO_INCREMENT,
        text VARCHAR(140),
        PRIMARY KEY (cid)
    );
`
let qa = `
    CREATE TABLE qa (
        qstnId INT,
        ansId INT,
        FOREIGN KEY (qstnId) REFERENCES question(qid),
        FOREIGN KEY (ansId) REFERENCES answer(aid)
    );
`
let qt = `
    CREATE TABLE qt (
        qstnId INT,
        tagId INT,
        FOREIGN KEY (qstnId) REFERENCES question(qid),
        FOREIGN KEY (tagId) REFERENCES tag(tid)
    );
`
let qc = `
    CREATE TABLE qc (
        qstnId INT,
        commentId INT,
        FOREIGN KEY (qstnId) REFERENCES question(qid),
        FOREIGN KEY (commentId) REFERENCES comment(cid)
    );
`
let ac = `
    CREATE TABLE ac (
        ansId INT,
        commentId INT,
        FOREIGN KEY (ansId) REFERENCES answer(aid),
        FOREIGN KEY (commentId) REFERENCES comment(cid)
    );
`
let uq = `
    CREATE TABLE uq (
        userId INT,
        qstnId INT,
        FOREIGN KEY (userId) REFERENCES user(uid),
        FOREIGN KEY (qstnId) REFERENCES question(qid)
    );
`
let ua = `
    CREATE TABLE ua (
        userId INT,
        ansId INT,
        FOREIGN KEY (userId) REFERENCES user(uid),
        FOREIGN KEY (ansId) REFERENCES answer(aid)
    );
`
let uc = `
    CREATE TABLE uc (
        userId INT,
        commentId INT,
        FOREIGN KEY (userId) REFERENCES user(uid),
        FOREIGN KEY (commentId) REFERENCES comment(cid)
    );
`
let ut = `
    CREATE TABLE ut (
        userId INT,
        tagId INT,
        FOREIGN KEY (userId) REFERENCES user(uid),
        FOREIGN KEY (tagId) REFERENCES tag(tid)
    );
`

connection.query(question)
connection.query(answer)
connection.query(tag)
connection.query(user)
connection.query(comment)
connection.query(qa)
connection.query(qt)
connection.query(qc)
connection.query(ac)
connection.query(uq)
connection.query(ua)
connection.query(uc)
connection.query(ut)

connection.end()
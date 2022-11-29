// Application server
// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

// const Question = require("./models/questions")
// const Tag = require("./models/tags")
// const Answer = require("./models/answers")

let userArgs = process.argv.slice(2)

const express = require("express")
const session = require("express-session")
// const cookieParser = require('cookie-parser');
const app = express()
const cors = require("cors")
const port = 8000

const bcrypt = require("bcrypt")

var mysql = require("mysql")
var connection = mysql.createConnection({
    host: "localhost",
    user: userArgs[1],
    password: userArgs[3],
    database: "fake_so"
})

var answerTable = require('./db/Answer.js');
var questionTable = require('./db/Question.js');
var commentTable = require('./db/Comment.js')
var tagTable = require('./db/Tag.js');
var userTable = require('./db/User.js');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
    session({
      secret: "secret",
      cookie: {},
      resave: false,
      saveUninitialized: false
    })
  )

app.get("/test", async (req, res) => {
    questionTable.getTags(connection, res, req.query.qid)
})

app.get("/questions", async (req, res) => {
    questionTable.getAll(connection, res)
})

app.get("/questionFromId", async (req, res) => {
    questionTable.getQuestion(connection, res, req.query.qid)
})

app.get("/answerFromId", async (req, res) => {
    answerTable.getAnswer(connection, res, req.query.aid)
})

app.get("/tagFromId", async (req, res) => {
    tagTable.getTag(connection, res, req.query.tid)
})

app.get("/questionIds", async (req, res) => {
    questionTable.getAllIds(connection, res)
})

app.get("/answers", async (req, res) => {
    answerTable.getAll(connection, res)
})

app.get("/tags", async (req, res) => {
    tagTable.getAll(connection, res)
})

app.get("/tagsFromQuestionID", async (req, res) => {
    questionTable.getTags(connection, res, req.query.qid)
})

app.get("/answersFromQuestionID", async (req, res) => {
    questionTable.getAnswers(connection, res, req.query.qid)
})

app.get("/questionsFromTagID", async (req, res) => {
    tagTable.getQuestions(connection, res, req.query.tid)
})

app.get("/questionsFromUserId", async (req, res) => {
    questionTable.getQuestionsFromUserId(connection, res, session.uid)
})

app.get("/answersFromUserId", async (req, res) => {
    answerTable.getAnswersFromUserId(connection, res, session.uid)
})

app.get("/tagsCreatedByUserId", async (req, res) => {
    tagTable.getTagsCreatedByUserId(connection, res, session.uid)
})

app.get("/tagsFromUserId", async (req, res) => {
    tagTable.getTagsFromUserId(connection, res, session.uid)
})

app.post("/addQuestion", async (req, res) => {
    questionTable.addQuestion(connection, res, req.body)
})

app.post("/addUserToQuestion", async (req, res) => {
    questionTable.addUserToQuestion(connection, res, req.body.qstnId, session.uid)
})

app.post("/addAnswer", async (req, res) => {
    answerTable.addAnswer(connection, res, req.body)
})

app.post("/addUserToAnswer", async (req, res) => {
    answerTable.addUserToAnswer(connection, res, req.body.ansId, session.uid)
})

app.post("/addTag", async (req, res) => {
    tagTable.addTag(connection, res, req.body)
})

app.post("/addAnswerToQuestion", async (req, res) => {
    questionTable.addAnswer(connection, res, req.body)
})

app.post("/addTagToQuestion", async (req, res) => {
    questionTable.addTag(connection, res, req.body)
})

app.post("/createAndAddTagToQuestion", async (req, res) => {
    questionTable.createAndAddTagToQuestion(connection, res, req.body, session.uid)
})

app.post("/updateQuestionViews", async (req, res) => {
    questionTable.updateViews(connection, res, req.body)
})

app.get("/tagExists", async (req, res) => {QuestionsFromSearch
    tagTable.tagByName(connection, res, req.query.name)
})

app.get("/questionsFromSearch", async (req, res) => {
    questionTable.getQuestionsFromSearch(connection, res, req.query.tags, req.query.words)
})

app.get("/commentsFromAnswerID", async (req, res) => {
    answerTable.getComments(connection, res, req.query.ansId)
})

app.get("/commentsFromQuestionID", async (req, res) => {
    questionTable.getComments(connection, res, req.query.qstnId)
})

app.get("/commentById", async (req, res) => {
    commentTable.commentById(connection, res, req.query.cid)
})

app.get("/userFromCommentId", async (req, res) => {
    userTable.getUserFromCommentId(connection, res, req.query.cid)
})

app.get("/userFromAnswerId", async (req, res) => {
    userTable.getUserFromAnswerId(connection, res, req.query.aid)
})

app.get("/userFromQuestionId", async (req, res) => {
    userTable.getUserFromQuestionId(connection, res, req.query.qid)
})

app.get("/user", async (req, res) => {
    userTable.getUser(connection, res, session.uid)
})

app.get("/reputationFromuserId", async (req, res) => {
    userTable.getReputation(connection, res, session.uid)
})



// Comment stuff

app.post("/addComment", async (req, res) => {
    commentTable.addComment(connection, res, req.body)
})

app.post("/addUserToComment", async (req, res) => {
    commentTable.addUserToComment(connection, res, req.body, session.uid)
})

app.post("/addCommentToAnswer", async (req, res) => {
    commentTable.addCommentToAnswer(connection, res, req.body)
})

app.post("/addCommentToQuestion", async (req, res) => {
    commentTable.addCommentToQuestion(connection, res, req.body)
})


// Updating things

app.post("/updateQuestionInfo", async (req, res) => {
    questionTable.updateInfo(connection, res, req.body)
})

app.post("/updateAnswerInfo", async (req, res) => {
    answerTable.updateInfo(connection, res, req.body)
})

app.post("/updateTagInfo", async (req, res) => {
    tagTable.updateInfo(connection, res, req.body)
})


// Vote stuff

app.post("/updateQuestionVotes", async (req, res) => {
    questionTable.updateVotes(connection, res, req.body)
})

app.post("/updateAnswerVotes", async (req, res) => {
    answerTable.updateVotes(connection, res, req.body)
})

app.get("/votesFromQuestionId", async (req, res) => {
    questionTable.getVotes(connection, res, req.query.qid)
})

app.get("/votesFromAnswerId", async (req, res) => {
    answerTable.getVotes(connection, res, req.query.aid)
})


// User stuff

app.post("/addUser", async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 5)
    userTable.addUser(connection, res, req.body)
})

app.post("/updateReputation", async (req, res) => {
    userTable.updateReputation(connection, res, req.body)
})

app.get("/login", async (req, res) => {
    let compare = async hash => {
        if (hash.length > 0) {
            let compareResult = await bcrypt.compare(req.query.password, hash[0].password)
            if(compareResult) {
                session.uid = hash[0].uid
                session.username = hash[0].username
            }
            res.send(compareResult)
        } else {
            res.send(false)
        }

    }
    userTable.getPassFromUsername(connection, compare, req.query.email)
})

app.get("/checkLoggedIn", async (req, res) => {
    let username = false
    if(session.username) username = session.username
    res.send(username)
})

app.get("/logout", async (req, res) => {
    session.uid = null
    session.username = null
    res.send("logged out")
})




app.listen(port, () => {
    connection.connect(function(err) {
        if(err) {
            console.error("error connecting:", err.stack)
            return
        }
        console.log("connected as id " + connection.threadId)
    })
})

process.on("SIGINT", () => {
    if(connection.state == "connected") {
        connection.end()
    }
    console.log("Server closed. Database instance disconnected.");
    process.exit();
})
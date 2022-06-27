const express = require("express")
const bodyParser = require("body-parser")
const nodeMailer = require("nodemailer")
const cors = require("cors")
const app = express()
const PORT = 3000

app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        app.use(cors());
        next();
    }
)

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Successfully connected to the API"
    })
})

app.post("/send-message", (req, res) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.gmail_account,
            pass: process.env.gmail_password
        }
    })

    const mailOptions = {
        from: "'Site Gustavo P. Santana' gustavopsantana.contato@gmail.com",
        to: req.body.destination,
        subject: req.body.subject,
        text: req.body.message,
        html: req.body.html
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.json({
                status: "error",
                message: err
            })
        } else {
            res.json({
                status: "success",
                message: "Message sent successfully"
            })
        }
    })
})

app.listen(process.env.PORT || PORT)
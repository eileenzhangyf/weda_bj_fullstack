const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  nodemailer = require("nodemailer"),
  creds = require("./config"),
  cors = require("cors");

app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

//const { spawn } = require('child_process').spawn;
//const watching = [
  // {service: "babel-watch"},
  //{service: "webpack-watch"},
  // {service: "sass-watch"},
  //{service: "server-watch"}
//];

{/*watching.forEach(({service}) => {
  const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run',  service]);
  child.stdout.on('data', d => console.log(d.toString()));
  child.stderr.on('data', d => console.log(d.toString()));
});
{/*spawn('node', ['script.js'], {
    env: {
        NODE_ENV: 'production',
        PATH: process.env.PATH
    }
})*/}

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully signed into Gmail account");
  }
});

app.post("/send", (req, res) => {
  const { name } = req.body;
  const {contact}=req.body;
  const { message } = req.body;

  var mail = {
    from: name,
    to: "eileen.zyf546@gmail.com",
    subject: "Feedback From The Blog",
    html: `${message}`+`${contact}` + "<br><br>Kindly,<br>" + `${name}`
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({ msg: "err" });
    } else {
      res.json({ msg: "suc" });
    }
  });
});
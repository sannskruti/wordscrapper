const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Router = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = 3000;

app.use(express.static("./public"));
app.use("/", (req, res, next) => {
  if (req.cookies && req.cookies.sid) {
  } else {
    const sessionId = uuidv4();
    res.cookie("sid", sessionId);
  }
  next();
});

Router(app);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

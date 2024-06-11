const { loggedInUsers, userStats } = require("../models/user");
const { loginPage } = require("../views/loginPage");
const { gamePage } = require("../views/gamePage");
const {
  isValidUsername,
  select_randomWord,
  checkWord,
  updateUser,
} = require("../helpers/usernameValidation");
const { errorPage } = require("./errorPage");

const words = require("../words");

module.exports.login = (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessionId && sessionId in loggedInUsers) {
    const username = loggedInUsers[sessionId];
    const gamePageContent = gamePage(
      username,
      words,
      userStats[username].guessList,
      userStats[username].win,
      userStats[username].score,
      userStats[username].isValid
    );
    // res.status(200).send(gamePageContent);
    res.send(gamePageContent);
  } else {
    const loginPageContent = loginPage();
    // res.status(200).send(loginPageContent);
    res.send(loginPageContent);
  }
};

module.exports.register = (req, res) => {
  const { username } = req.body;
  const sessionId = req.cookies.sid;
  let errorMessage = "";
  if (!isValidUsername(username)) {
    errorMessage = "Invalid username or username is having space";
    res.status(400).send(errorPage(errorMessage));
  } else if (username === "dog") {
    errorMessage = "Username 'dog' is not allowed";
    res.status(403).send(errorPage(errorMessage));
  } else {
    loggedInUsers[sessionId] = username;
    const currSecretWord = Object.keys(userStats).includes(username)
      ? ""
      : select_randomWord(words);
    updateUser(currSecretWord, username, [], false, 0);
    res.redirect("/");
  }
};
module.exports.logout = (req, res) => {
  const sessionId = req.cookies.sid;
  delete loggedInUsers[sessionId];
  res.clearCookie("sid");
  res.redirect("/");
};

module.exports.checkWord = (req, res) => {
  const sessionId = req.cookies.sid;
  const username = loggedInUsers[sessionId];
  let { guessedWord } = req.body;
  guessedWord = guessedWord.toLowerCase();
  if (guessedWord === userStats[username].secretWord) {
    const guess = {
      [guessedWord]: guessedWord.length,
    };
    updateUser("", username, guess, 1, true, true);
    res.cookie("winner", true);
  } else {
    if (
      words.includes(guessedWord) &&
      !Object.keys(userStats[username].guessList).includes(guessedWord)
    ) {
      const { count, matchedLetters } = checkWord(
        guessedWord,
        userStats[username].secretWord
      );
      const guess = {
        [guessedWord]: count,
      };
      updateUser("", username, guess, 0, false, true);
    } else {
      updateUser("", username, {}, 0, false, false);
    }
  }
  res.redirect("/");
};

module.exports.newGame = (req, res) => {
  const sessionId = req.cookies.sid;
  const username = loggedInUsers[sessionId];
  const currSecretWord = select_randomWord(words);
  updateUser(currSecretWord, username, false, 0, false, true);
  res.redirect("/");
};

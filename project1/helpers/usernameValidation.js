const { userStats } = require("../models/user");

module.exports.isValidUsername = (username) => {
  const specialCharRegex = /[^a-zA-Z0-9_]/;
  return !specialCharRegex.test(username) && username !== "";
};

module.exports.select_randomWord = (words) => {
  let secretword = words[Math.floor(Math.random() * words.length)];
  return secretword;
};

module.exports.checkWord = (guessedWord, secretWord) => {
  guessedWord = guessedWord.toLowerCase();
  secretWord = secretWord.toLowerCase();
  const guessedLetters = guessedWord.split("");
  const actualLetters = secretWord.split("");
  let matchedLetters = [];
  let count = 0;
  for (let letter of guessedLetters) {
    const index = actualLetters.indexOf(letter);
    if (index !== -1) {
      count++;
      matchedLetters.push(letter);
      // Remove the matched letter from actualLetters array
      actualLetters.splice(index, 1);
    }
  }
  return {
    count: count,
    matchedLetters: matchedLetters,
  };
};

module.exports.updateUser = (
  secretWord,
  username,
  guess,
  score,
  winner,
  isValid
) => {
  if (Object.keys(userStats).includes(username)) {
    const currentUser = userStats[username];
    const updatedUser = {
      ...currentUser,
      guessList: !guess ? {} : { ...currentUser.guessList, ...guess },
      win: winner,
      score: currentUser.score + score,
      isValid: isValid,
    };

    updatedUser.secretWord =
      secretWord !== "" ? secretWord : currentUser.secretWord;

    userStats[username] = updatedUser;
  } else {
    const newUser = {
      secretWord: secretWord !== "" ? secretWord : undefined,
      guessList: {},
      win: false,
      score: 0,
      isValid: true,
    };
    userStats[username] = newUser;
  }
  console.log(userStats, "stats"); // This console is to test secret word for the specfic user
};

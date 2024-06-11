module.exports.gamePage = (
  username,
  wordsToGuess,
  guessedWords,
  winner,
  score,
  isValid
) => {
  // console.log(isValid, "isvald");
  return `
  <!doctype html>
<html>

<head>
    <title>Word Scrapper</title>
    <link rel="stylesheet" href="/styles/game.css">
</head>

<body>

    <div id="game-app">
        <img src="./assests/inside_game_wallpaer.jpg" alt="game-wallpaer" class="container-Img" />
        <div class="game-container">
            <div class="navBar">
                <h3 class="game-name">Word Scrapper</h3>
                <p class="player-name">Player: ${username}</p>
                ${winner ? `
                      <p class="game-success">Wohooo! You Win, Start New Game</p> 
                      ` : ""}
        
                <p class="player-name">Guesses: ${
                  Object.keys(guessedWords).length || 0
                }</p>
                <p class="score">Score: ${score}</p>
                <div class="home-button">
                    <form action="/newgame" method="GET">
                        <button type="submit" class="new-game-btn">New Game</button>
                    </form>
                    <form action="/logout" method="POST">
                        <button type="submit" class="logout-btn">Quit</button>
                    </form>
                </div>
            </div>
            <div class="word-list">
                <h2 class="word-list-heading">Word List</h2>
                <div class="word-container">
                    ${wordsToGuess
                      .map((word) => {
                        return `<p class="word">${word}</p>`;
                      })
                      .join(" ")}
                </div>
            </div>
            
            <form action="/guess-word" method="POST" class="guess-word-form">
                <h1 class="label-guess">Make a guess!</h2>
                    <input type="text" id="guess-word-input" name="guessedWord" class="guess-word-input"
                        placeholder="Enter your word">
                    <button type="submit" class="update-btn">Go</button>
                    ${isValid ? "" : `<p class="invalid-guess">Invalid Guess!Either repeated word, or word out of word-list</p>`}
            </form>
            ${winner ? `
            <img src="./assests/giphy.gif" alt="game-dancing" class="dancing-gif" />
            ` : ""}
        </div>
        <div>
            <h2 class="my-guessed-word-list"> Word-guess history </h2>
            <div class="list-container">
                        ${Object.entries(guessedWords).map(([word, count]) => {
                          return `<div class="word-wrap">
                                    <p class="guess-word">You guessed: ${word}</p>
                                    <p>letters matched: ${count}</p>
                                  </div>`;
                        })}
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

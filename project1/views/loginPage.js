module.exports.loginPage = () => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Word Scrapper</title>
      <link rel="stylesheet" href="/styles/login.css" />
    </head>
    <body>
      <div class="container">
          <img src="./assests/wallpaper.avif" alt="wallpaer" class="container-Img" />
          <div id="login">
            <h3 class="game-name">Word Scrapper</h3>
            <form action="/register" method="POST" class="input-form">
              <input
                type="text"
                id="username-input"
                name="username"
                placeholder="Enter username"
                class="textbox"
              />
              <button type="submit" class="submit-btn">Play</button>
            </form>
          </div>
      </div>
    </body>
  </html>
    `;
};

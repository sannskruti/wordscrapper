module.exports.errorPage = (errorMessage) => {
  return `<!DOCTYPE html>
        <html>
        <head>
            <title>Word SCrapper Error </title>
            <link rel="stylesheet" href="/styles/error.css">
        </head>
        <body>
            <div class="error-container">
                <p>${errorMessage}</p> <a href='/'>Go back to login</a>
            </div>
        </body>
        </html>`;
};

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const author = "Vaibhav Vats";

const topic = "School Management System API";

const messageSent = `    
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f9;
                    color: #333;
                    text-align: center;
                }
                .container {
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #4CAF50;
                    font-size: 2.5em;
                }
                p {
                    font-size: 1.2em;
                    line-height: 1.6;
                }
                a {
                    color: #0077B5;
                    text-decoration: none;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 1.1em;
                }
                .footer a {
                    text-decoration: none;
                    color: #0077B5;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>${topic}</h1>
                <p>The server is running on port: <strong>${PORT}</strong>.</p>
                <p>This API is created by <strong>${author}</strong>.</p>
                <div class="footer">
                    <p>You can visit the API documentation here: 
                    <a href="https://github.com/vaibhavvatsbhartiya/School-Management-System-API" target="_blank">API Docs</a></p>
                    <p>Connect with me on LinkedIn: 
                    <a href="https://www.linkedin.com/in/vaibhav-vats-" target="_blank">Vaibhav Vats LinkedIn</a></p>
                </div>
            </div>
        </body>
    </html>
    `;


module.exports = messageSent;
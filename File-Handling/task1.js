const http = require("http");
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, 'logs', 'log.txt');

function logRequest(req) {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();

    const log = `${time} | ${method} | ${url}\n`

    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            console.error("Error writing log", err);

        }
    })
}
const server = http.createServer((req, res) => {
    logRequest(req);

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Home Page</h1>");
    }
    else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("About Page")
    }
    else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ name: "Mridul" }));
    }
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
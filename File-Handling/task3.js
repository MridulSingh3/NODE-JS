const url = require('url');
const path = require('path');
const fs = require('fs');
const http = require('http');

const logPath = path.join(__dirname, "logs", "./log.txt");
const visitPath = path.join(__dirname, '/visit.txt');

function logRequest(req) {
    const method = req.method;
    const path = req.url;
    const time = new Date().toISOString();

    const log = `${time} | ${method} | ${path}\n`;

    fs.appendFile(logPath, log, (err) => {
        if (err) {
            console.log("Error Occur");
            return;
        }
    })
}
const server = http.createServer((req, res) => {
    logRequest(req);

    if (req.url === '/visits' && req.method === 'GET') {
        fs.readFile(visitPath, "utf-8", (err, result) => {
            let count = 0;

            if (!err && result) {
                count = parseInt(result) || 0;
            }
            count++;

            fs.writeFile(visitPath, count.toString(), (err) => {
                if (err) {
                    res.end("Error Updating Count");
                    return;
                }
                res.end(`Visits Count Increases`)
            })
        })
    }
    else if (req.url === '/count' && req.method === "GET") {
        fs.readFile(visitPath, "utf-8", (err, result) => {
            if (err) {
                res.end("Error Occur");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Visits Count: ${result}`)
        })
    }
    else if (req.url === "/clear" && req.method === "GET") {
        fs.writeFile(visitPath, "0", (err) => {
            if (err) {
                res.end("Error Occur");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Data Clear successfully!")
        })
    }
})

const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
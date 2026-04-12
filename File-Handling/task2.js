const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const note = path.join(__dirname, 'note.txt');

const server = http.createServer((req, res) => {

    if (req.url.startsWith('/add') && req.method === 'GET') {
        const myUrl = url.parse(req.url, true);

        const data = myUrl.query.note || '';
        if (data.trim().length == 0) {
            res.end("Empty note not allowed");
            return;
        }
        else {
            fs.appendFile(note, data + '\n', (err) => {
                if (err) {
                    console.log("error occur");
                    return;
                }
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("Data Write succesfully");
            })
        }
    }
    else if (req.url === '/notes' && req.method === 'GET') {

        fs.readFile(note, "utf-8", (err, result) => {
            if (err) {
                console.log("Error Occur");
                return;
            }
            res.writeHead(200, ({ "Content-Type": "text/plain" }))
            res.end(result);
        })
    }
    else if (req.url === '/clear' && req.method === 'GET') {
        fs.writeFile(note, "", (err) => {
            if (err) {
                console.log("Error occur");
                return;
            }
            res.writeHead(200, ({ "Content-Type": "text/plain" }))
            res.end("Data clear succesfully");
        })
    }
    else {
        res.writeHead(200, ({ "Content-Type": "text/plain" }))
        res.end("Route not found");
    }

})
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
})
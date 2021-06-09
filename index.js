let http = require('http');
let fs = require('fs');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer(async function (req, res) {
    let filepath = "." + req.url;

    if (filepath == "./") {
        filepath = "./index.html";
    }

    try {
        const data = await fs.promises.readFile(filepath, { encoding: 'utf-8' });
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();

    } catch (err) {
        const data404 = await fs.promises.readFile('./404.html', { encoding: 'utf-8' });

        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data404);
        res.end();
    }
});

server.listen(port, hostname, function() {
    console.log('Up and running!');
});
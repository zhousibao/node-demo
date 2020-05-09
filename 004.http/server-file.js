var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 获取当前目录
var root = path.resolve(process.argv[2] || '.');
// console.log('root: ' + root);

var server = http.createServer((request, response) => {
    var pathname = url.parse(request.url).pathname; // '/static/index.html'
    var filepath = path.join(root, pathname); // '/static/index.html

    // fs.stat() 获得文件信息方法
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) { // stats.isFile() 是否是文件
            console.log('200 ' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8081);
// console.log('http://localhost:8081/static/index.html')
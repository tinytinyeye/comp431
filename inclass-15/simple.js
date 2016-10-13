var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     var payload = { 'hello': 'world' }
     var result = JSON.stringify(payload);

     if (req.method === "GET") {
          if (req.url === "/articles") {
               payload = { articles: [ { id : 1, author: "Scott", body : "A post" }, 
                                       { id : 2, author: "Scott", body : "A old post" }, 
                                       { id : 3, author: "Scott", body : "A very old post" } ] }
               result = JSON.stringify(payload);                       
          }
     } else if (req.method === "POST") {
          if (req.url === "/login") {
               payload = { username: JSON.parse(req.body).username, result: "success" }
               result = JSON.stringify(payload);
          }
     } else if (req.method === "PUT") {
          if (req.url === "/logout") {
               result = "OK\n"
          }
     }

     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(result);
}

var url = require('url');
var http = require('http');
var colorcode = require('../../')
var argv = process.argv.slice(2)

var error_argv = function(){
  console.log("listen for a colorcode url and send back a png")
  console.log("usage: node url_to_png_server.js port")
}

if (argv.length !== 1)
  return error_argv()

http.createServer(function (req, res) {
  // var path = url.parse(req.url).pathname.slice(5)
  //                                          ^/png/
  var path = url.parse(req.url).pathname.slice(1)
  path = decodeURIComponent(path)
  colorcode.to_canvas(path, {done:function(canvas){
    console.log(canvas.width, canvas.height)
    res.writeHead(200, {'Content-Type': 'image/png'});
    canvas.toBuffer(function(err, buf){
      res.end(buf)
    });
  }}); 
}).listen(argv[0]);

console.log('Server running on port ' + argv[0]);

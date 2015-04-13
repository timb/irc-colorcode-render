var fs = require('fs');
var colorcode = require('../../');

// white on black
// colorcode.style.bg = 1
// colorcode.style.fg = 0

var start = Date.now()

var argv = process.argv.slice(2);

var error_argv = function(){
  console.log('make a png from an irc color code')
  console.log('usage: node colorcode_to_png.js color_code.txt out.png')
  return;
}

if (argv.length !== 2)
  return error_argv()

var write_png = function(canvas){
  canvas.toBuffer(function(err, buf){
    if (err) return console.log(err);
    var filename = __dirname + '/' + argv[1];
    fs.writeFile(filename, buf, function(){
      console.log('made %s in %dms', filename, Date.now() - start);
    });
  });
}


fs.readFile(argv[0], 'utf8', function(err, data){
  if (err) return console.log(err);
  colorcode.to_canvas(data, {done:write_png});
});


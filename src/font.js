var style = require('./style');
// node-canvas
var Canvas = require('canvas');
if (typeof Image === "undefined") Image = Canvas.Image;

var font = {};
module.exports = font;

// hack for loading fonts in node... todo, fix this
font.img_path = "";
if (typeof document === "undefined") font.img_path = __dirname + "/../examples/web/"


font.list = {};

font.list.fixedsys = require('./font/fixedsys');
var cp437s = require('./font/cp437');
for (f in cp437s) font.list[cp437s[f].name] = cp437s[f];

style.font = 'fixedsys';

var err_font_load = function(){
  console.log("couldn't load font")
}


font.load = function(font_name, callback_fn){
  if (!(font_name in font.list)) { return;} // todo error
  
  var f = font.list[font_name]
  
  if (f.loaded) {
    callback_fn(f);
  } else {
    f.sheet = new Image();
    f.sheet.crossOrigin = 'anonymous'
    // node-canvas doesn't have addEventListener :(
    f.sheet.onload = function(){
      f.loaded = true
      callback_fn(f);
    }
    f.sheet.src = font.img_path + f.sheet_url

  }
}


var to_json = require('./to_json');
var fontload = require('./font').load;
var style = require('./style');
var color = require('./color');

// node-canvas
var Canvas = require('canvas');
if (typeof Image === "undefined") Image = Canvas.Image;

var make_canvas = function(){
  if (typeof document === "undefined" && typeof Canvas !== "undefined")
    return new Canvas();
  else
    return document.createElement("canvas");
}

var canvas_tmp;

var render_colorcode = function(json, canvas, font, opts){

  var cw = font.char_w
    , ch = font.char_h
    , ctx = canvas.getContext('2d')
    , canvas_tmp = canvas_tmp || make_canvas()
    , ctx_tmp = canvas_tmp.getContext("2d")

  var palette = color.palettes[opts.palette || style.palette];
  var bg = opts.bg || style.bg;

  canvas_tmp.width = cw;
  canvas_tmp.height = ch;

  canvas.width = json.w * cw;
  canvas.height = json.h * ch;

  // pre fill entire canvas with bg color
  // is this a good optimization?
  if (bg === color.transparent_index){
    // already cleared when resized above
    // canvas.clearRect(0,0, canvas.width,canvas.height);
  } else {
    ctx.fillStyle = palette[bg];
    ctx.fillRect(0,0, canvas.width,canvas.height);
  }

  for (var l=0; l<json.lines.length; l++){
    var line = json.lines[l];
    for (var c=0; c<line.length; c++){
      var char = line[c];
      var x = c * cw
      var y = l * ch
      
      // draw bg for this char if not already filled
      if (char.bg !== bg) {
        if (char.bg === color.transparent_index) {
            ctx.clearRect(x, y, cw, ch)
        } else { 
          ctx.fillStyle = palette[char.bg]
          ctx.fillRect(x, y, cw, ch);
        }
      }

      if (font.is_char_blank(char.value)) continue;

      // draw char in fg
      var fg = palette[char.fg]
      if (fg !== color.transparent){
        ctx_tmp.globalCompositeOperation = 'source-over'
        ctx_tmp.fillStyle = fg
        ctx_tmp.fillRect(0,0,cw,ch)
        ctx_tmp.globalCompositeOperation = 'destination-in'
        font.render_char(font, char.value, ctx_tmp, 0, 0, char)
        ctx.drawImage(canvas_tmp, x, y)
      } else { // transparent foreground punches out bg
        ctx.globalCompositeOperation = 'destination-out'
        font.render_char(font, char.value, ctx, x, y, char)
        ctx.globalCompositeOperation = 'source-over'
      }

    }
  }

  if (opts.done) opts.done(canvas)


}

var to_canvas = function(string_or_json, opts){
  opts = opts || {};
  
  if (typeof string_or_json === 'string')
    string_or_json = to_json(string_or_json, opts);
  
  var canvas = opts.canvas || make_canvas();
  var font_name = opts.font || style.font;

  fontload(font_name, function(font){ 
    render_colorcode(string_or_json, canvas, font, opts)
  });

  return canvas;
}

module.exports = to_canvas;

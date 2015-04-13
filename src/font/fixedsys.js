var font = {};
module.exports = font;
font.name = 'fixedsys'
font.sheet_url = './img/fsex-simple.png'
font.sheet_w_in_chars = 128
//url_sheet = 'http://i.imgur.com/vSzBNwZ.png'
font.char_w = 8
font.char_h = 16;
font.is_char_blank = require('../fontutil').is_char_blank;

font.render_char = function(font, char_value, ctx, ctx_x, ctx_y, char){
  var sheet_x = 0, sheet_y = 3;
  if (char_value >= 0x20 && char_value <= 0x7e){ // ascii
    sheet_x = (char_value - 0x20) * font.char_w
    if (char.i){ // italic
      sheet_y = 1 * font.char_h + 3
    }
  } else if (char_value >= 0x2500 && char_value <= 0x25ff){ // geom
    sheet_x = (char_value - 0x2500) * font.char_w; 
    sheet_y = 2 * font.char_h + 3
  } else if (char_value >= 0x2600 && char_value <= 0x26ff){ // emoji
    sheet_x = (char_value - 0x2600) * font.char_w; 
    sheet_y = 3 * font.char_h + 3
  }

  // var sheet_x = (char_value % font.sheet_w_in_chars) * font.char_w
  // var sheet_y = ((char_value / font.sheet_w_in_chars) |0) * font.char_h + 3
  ctx.drawImage(font.sheet, 
               sheet_x|0, sheet_y|0, font.char_w, font.char_h,
               ctx_x|0, ctx_y|0, font.char_w, font.char_h)

}

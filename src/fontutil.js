var util = {};
module.exports = util;

util.is_char_blank = function(char_value){
  if (char_value === 32) return true;
}

util.render_char = function(font, char_value, ctx, ctx_x, ctx_y){
  var sheet_x = (char_value % font.sheet_w_in_chars) * font.char_w
  var sheet_y = ((char_value / font.sheet_w_in_chars) |0) * font.char_h
  ctx.drawImage(font.sheet, 
               sheet_x|0, sheet_y|0, font.char_w, font.char_h,
               ctx_x|0, ctx_y|0, font.char_w, font.char_h)

}


var cp437s = [[8,8],[8,12],[8,14],[8,16],[10,10],[10,16],[12,12],[16,16]]
var fonts = {};
module.exports = fonts;

// utf8 -> cp437 function by sheetjs
// edited from https://github.com/SheetJS/js-codepage/blob/master/bits/437.js
var cp437 = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d[i]] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();

var render_char = function(font, char_value, ctx, ctx_x, ctx_y){
  char_value = cp437.enc[String.fromCharCode(char_value)] | 0;
  var sheet_x = (char_value % font.sheet_w_in_chars) * font.char_w
  var sheet_y = ((char_value / font.sheet_w_in_chars) |0) * font.char_h
  ctx.drawImage(font.sheet, 
               sheet_x|0, sheet_y|0, font.char_w, font.char_h,
               ctx_x|0, ctx_y|0, font.char_w, font.char_h)

}

for (var i=0, wh; wh=cp437s[i]; i++){
  var font = {};
  font.is_char_blank = require('../fontutil').is_char_blank;
  font.render_char = render_char;
  font.name = 'cp437_' + wh[0] + 'x' + wh[1];
  font.sheet_url = './img/' + font.name + '.png'
  font.sheet_w_in_chars = 16;
  font.char_w = wh[0]
  font.char_h = wh[1]
  fonts[font.name] = font;
}



// window.cp437 = cp437;

var char_color = '\x03';

var make_colorcode_fgbg = function(fg, bg){
  // pad numbers: this prevents irc parsing confusion
  // when the character after the colorcode is a number
  if (fg < 10) fg = "0" + fg;
  if (bg < 10) bg = "0" + bg;
  return char_color + fg + "," + bg
}

var colorcode_from_json = function(json, opts){
  var out = "";
  for (var li=0, line; line=json.lines[li]; li++){
    for (var ci=0, char; char=line[ci]; ci++){
      out += make_colorcode_fgbg(char.fg, char.bg)
      out += String.fromCharCode(char.value)
    }   
    out += "\n";
  }
  return out;
}


module.exports = colorcode_from_json;

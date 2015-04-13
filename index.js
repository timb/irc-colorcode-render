var colorcode = {};
module.exports = colorcode;
colorcode.to_json = require('./src/to_json');
colorcode.from_json = require('./src/from_json');
colorcode.style = require('./src/style');
colorcode.to_canvas = require('./src/canvas');
colorcode.color = require('./src/color');
colorcode.font = require('./src/font');

# irc-colorcode-render

parses irc colorcodes, and converts them to images

works in browsers and with node

## api

### rendering

    colorcode.to_canvas(text [, opts])

renders colorcode text to a canvas, and returns the canvas. `text` can be a string or json.

the function will return immediately, but the canvas might be drawn asynchronously, if it is waiting for a font to load. you can pass a callback function to be called when the canvas is complete in `opts`:
    
    colorcode.to_canvas("hello world", {done: function(canvas){ ... }})

if `opts` has a `canvas` property, that canvas will be drawn on instead of creating one.

### styles

`opts` can also contain other properties like `palette` (sets color scheme) or `fg` (sets initial foreground text color). styles can also be set globally on `colorcode.style`, for example:

    colorcode.style.palette = 'mirc'

### parsing

    colorcode.to_json(text [, opts])

parses a colorcode into a json structure. the json has a `width` and `height` (measured in characters), and an array `lines` that has an array for each line of text. each line is an array of objects for each character. each character object has a unicode `value`, a `fg` and `bg`, which are foreground and background color numbers, and `b`, `i`, `u` (bold/italic/underline) styling flags.

## installation

### browser

you can just include the file `build/irc-colorcode-render.js`

running `make` will recompile the browser build of irc-colorcode-render.js  

### node

this is a little more involved :(

assuming debian/ubuntu, install cairo dependencies:

    sudo apt-get update
    sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++

(for other systems, check [node-canvas wiki](https://github.com/Automattic/node-canvas/wiki))

if you don't have npm/node,  install it:

    sudo apt-get install npm
    sudo npm update -g npm
    sudo npm install -g n
    sudo n stable

finally, 

    sudo npm install irc-colorcode-render

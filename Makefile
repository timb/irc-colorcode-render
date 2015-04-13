web:
	browserify \
	--standalone colorcode \
	--ignore canvas \
	index.js > build/irc-colorcode-render.js
	cp build/irc-colorcode-render.js examples/web/irc-colorcode-render.js

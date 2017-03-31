## How to use
```js
var LogTool = require('logger');
var logger = LogTool.getLogger('driver_socket');
logger.warn('test');
```


## log layout
	[yyyy-mm-dd hh24:mi:ss] ${level} [${classPathName}:${line}] - test

## dependencies
	"dependencies": {
		"logger": "git+https://github.com/konalean/logger.git",
	  }


## License
MIT

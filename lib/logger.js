'use strict';

var fs = require('fs');
var log4js = require('log4js'); 
var logger = module.exports = function() {
    this.logPattern = "[%d{yyyy-MM-dd hh:mm:ss}] %p (%x{ln}) [%c] - %m";
    this.logToken = {
        
                    ln : function() {
                        var errStack  = (new Error).stack.split("\n");
                        var realStack = errStack[10];
                        if(errStack[11] && (errStack[11].indexOf('/')>=0 && errStack[11].indexOf('node_modules')==-1)) {
                            realStack = errStack[11];
                        }


                        // console.log((new Error).stack);
                        // console.log('1111111111111111111111');
                        // console.log((new Error).stack.split("\n")[11]);
                        // console.log('2222222222222222222222');
                        // console.log((new Error).stack.split("\n")[10]);
                        // console.log('------------------------');

                        // console.log( (new Error).stack.split("\n")[10]);
                        // console.log('=====================');


                        return realStack
                        // Just the namespace, filename, line:
                        .replace(/^\s+at\s+(\S+)\s\((.+?)([^\/]+):(\d+):\d+\)$/, function (word){
                            /*
                            var wordAry = word.split("\n");
                            console.log(wordAry.length);
                            if(wordAry.length>1) {
                                console.log(wordAry[1]);
                            }
                            else {
                                console.log(wordAry[0]);
                            }
                            */
                            var path = '';
                            var argPathAry = arguments[2] ? arguments[2].split('/') : [];

                            if(argPathAry.length>0) {
                                path = argPathAry[argPathAry.length-2] + '/';
                            }

                
                            return path + arguments[3] +':'+ arguments[4];
                            // return arguments[0] +' '+ arguments[2] +' line '+arguments[3]
                        }).replace(/^\s+at\s+(.+?)([^\/]+):(\d+):\d+/,function() {

                            var path = '';
                            var argPathAry = arguments[1] ? arguments[1].split('/') : [];

                            if(argPathAry.length>0) {
                                path = argPathAry[argPathAry.length-2] + '/';
                            }

                            return path + arguments[2]+':'+ arguments[3];
                        });
                    }
    }
    
};

logger.prototype.getLogger = function(project, level) {
    var logDir = 'logs/';
    if (!fs.existsSync(logDir)){
        fs.mkdirSync(logDir);
    }

    log4js.configure({
      appenders: [{ 
            type: 'console',
            layout: {
                type    : "pattern",
                pattern : this.logPattern,
                tokens: this.logToken
            }         
        },
        
        { 
            type: 'dateFile',
            filename: 'logs/'+project+'.log', 
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: false,
            layout: {
                type: 'pattern',
                pattern: this.logPattern,
                tokens: this.logToken
            }  
        }]
    });
    
    if(undefined==level || null==level) {
        level = 'WARN';
    }
    
    var logger = log4js.getLogger(project);
    logger.setLevel(level);
    return logger;
    
};
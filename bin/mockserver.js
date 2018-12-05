#!/usr/bin/env node

var http        = require('http');
var mockserver  = require('./../mockserver');
var argv        = require('yargs').argv;
var colors      = require('colors')
var info        = require('./../package.json');
var mocks       = argv.m || argv.mocks;
var port        = argv.p || argv.port;
var verbose     = !(argv.q || argv.quiet);
var assets      = argv.a || argv.assets

if (!mocks || !port) {
    console.log([
        "Mockserver v" + info.version,
        "",
        "Usage:",
        "  mockserver [-q] -p PORT -m PATH [-a ASSETS_PATH]",
        "",
        "Options:",
        "  -p, --port=PORT             - Port to listen on",
        "  -m, --mocks=PATH            - Path to mock files",
        "  -q, --quiet                 - Do not output anything",
        "  -a, --assets=ASSETS_PATH    - Path to asset files",
        "",
        "Example:",
        "  mockserver -p 8080 -m './mocks' -a '/mock/assets'"
    ].join("\n"));
} else {
    http.createServer(mockserver(mocks, verbose, assets)).listen(port);

    if (verbose) {
        console.log('Mockserver serving mocks {'
            + 'verbose'.yellow + ':' + (verbose && 'true'.green || 'false')
            + '} under "' + mocks.green  + '"'
            + (assets ? ' and assets under "' + assets.green + '"': '')  + ' at '
            + 'http://localhost:'.green + port.toString().green);
    }
}

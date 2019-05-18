var express = require("express");
var proxy = require("http-proxy-middleware");

var app = express();

app.use("", proxy({ target: "http://148.70.204.30", changeOrigin: true }));

app.listen(3000);
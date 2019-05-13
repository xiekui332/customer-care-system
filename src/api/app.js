var express = require("express");
var proxy = require("http-proxy-middleware");

var app = express();

app.use("", proxy({ target: "http://localhost", changeOrigin: true }));

app.listen(3000);
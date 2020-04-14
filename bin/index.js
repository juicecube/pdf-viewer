const http = require('http');
const express = require('express');
const url = require('url');
const path = require('path');
const fs = require('fs');
const qs = require('querystring');
const app = express();
require("node-jsx").install();
var React = global.React = require("react");
var ReactDOMServer = require('react-dom/server');

const PDFJS = require('pdfjs-dist');
PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

const PORT = 5000;

(function injectScript() {
  const configScript = `<!--scriptArea--><script>window.PDFJS = 111</script><!--endOfScriptAreaArea-->`;
  const htmlPath = path.join(__dirname, '../src/index.ejs');
  let htmlData = fs.readFileSync(htmlPath, { encoding: 'utf8' });
  htmlData = htmlData.replace(/<!--scriptArea-->(.)*<!--endOfScriptAreaArea-->/, configScript);
  fs.writeFileSync(htmlPath, htmlData);
})()

const returnParamIllegal = (res) => {
  res.writeHead(403, { 'Content-Type': 'text/plain' });
  res.write('403 - param illegal');
  res.end();
};

// const handleSuccess = (res) => {
//   res.sendFile(path.join(__dirname, '../index.ejs'));
// }

// const handleFaild = (res) => {
//   res.writeHead(500, { 'Content-Type': 'text/plain' });
//   res.write('500 - faild');
//   res.end();
// }

//指定模板引擎
app.set("view engine", 'ejs');
//指定模板位置
app.set('views', path.join(__dirname, '../src'));

app.get('/preview', function(req, res) {
  const reqUrl = url.parse(req.url);
  const arg = qs.parse(reqUrl.query);
  if (!arg.url) {
    returnParamIllegal(res);
    return;
  }
  const PdfComponent = require('../src/components/pdf-component/index.jsx');
  res.render('index.ejs', {
    component: ReactDOMServer.renderToString( React.createElement(PdfComponent, {url: arg.url}) )
  });
  // handleSuccess(res);
  // handlePdfUrl(arg.url, () => {}, () => handleFaild(res));
  // handlePdfUrl(arg.url, () => handleSuccess(res), () => handleFaild(res));
});


const server = http.createServer(app);

server.listen(PORT, function() {
  console.log('服务器运行中');
  console.log(`正在监听 ${PORT} 端口...`);
});



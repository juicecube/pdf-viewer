const express = require('express');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const app = express();

const PORT = 5000;

const returnParamIllegal = (res) => {
  res.writeHead(403, { 'Content-Type': 'text/plain' });
  res.write('403 - param illegal');
  res.end();
};

app.use(express.static(
  path.join(__dirname, '../lib'),
));

// pdf预览服务
app.get('/preview', function(req, res) {
  const reqUrl = url.parse(req.url);
  const arg = qs.parse(reqUrl.query);
  if (!arg.url) {
    returnParamIllegal(res);
    return;
  }
  res.sendFile(path.join(__dirname, `../lib//web/viewer.html`));
});

// 用于运维侧的健康检查
app.get('/healthy', function(req, res) {
  res.send('success');
});

app.listen(PORT, function() {
  console.log('服务器运行中');
  console.log(`正在监听 ${PORT} 端口...`);
});



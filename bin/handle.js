const fs = require('fs');
const PDFJS = require('pdfjs-dist');
PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

const handlePdfUrl = () => {
  const search = window.location.search;
  const index = search.indexOf('=');
  const url = search.slice(index);
  console.log('url', url);
  PDFJS.getDocument(url).then((pdf) => {
    console.log('getDocument');
    return pdf.getPage(1);
  }).then((page) => {
    console.log('page');
    // 设置展示比例
    var scale = 1.5;
    // 获取pdf尺寸
    var viewport = page.getViewport(scale);
    // 获取需要渲染的元素
    var canvas = document.getElementById('pdf-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    page.render(renderContext);
  }).catch((e) => {
    console.log(e);
  });

  // const configScript = `<script>${JSON.stringify(_config.runtime)}</script>`;

  // try {
  //   const htmlPath = path.join(__dirname, '../index.html');
  //   let htmlData = fs.readFileSync(htmlPath, { encoding: 'utf8' });
  //   htmlData = htmlData.replace(/<!--configArea-->(.)*<!--endOfConfigArea-->/, configScript);
  //   fs.writeFileSync(htmlPath, htmlData);
  //   successCallBack && successCallBack();
  // } catch(e) {
  //   console.log(e);
  //   faildCallBack && faildCallBack();
  // }
}

// module.exports = {
//   handlePdfUrl,
// };
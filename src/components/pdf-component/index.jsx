const React = require("react");
const propTypes = require('prop-types');
const PDFJS = require('pdfjs-dist');
PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';


class PdfComponent extends React.Component{
  componentDidMount() {

    console.log('componentDidMount');
    // const url = this.props.url;
    // console.log('url', url);

    // PDFJS.getDocument(url).then((pdf) => {
    //   console.log('getDocument');
    //   return pdf.getPage(1);
    // }).then((page) => {
    //   console.log('page');
    //   // 设置展示比例
    //   var scale = 1.5;
    //   // 获取pdf尺寸
    //   var viewport = page.getViewport(scale);
    //   // 获取需要渲染的元素
    //   var canvas = document.getElementById('pdf-canvas');
    //   var context = canvas.getContext('2d');
    //   canvas.height = viewport.height;
    //   canvas.width = viewport.width;
      
    //   var renderContext = {
    //     canvasContext: context,
    //     viewport: viewport
    //   };
    //   page.render(renderContext);
    // }).catch((e) => {
    //   console.log(e);
    // });

    const reader = new FileReader();
    reader.readAsDataURL(url);
    reader.onload = () => {
      const pdfData = atob(reader.result.substring(reader.result.indexOf(',') + 1));
      this.previewPDF(pdfData);
    }
  }
  previewPDF(pdfData) {
    // 引入pdf.js的字体
    const CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/'
    //读取base64的pdf流文件
    PDFJS.getDocument({
      data: pdfData, // PDF base64编码
      cMapUrl: CMAP_URL,
      cMapPacked: true
    }).then((pdf) => {
      const numPages = pdf.numPages
      const pageNumber = 1
      this.getPage(pdf, pageNumber, numPages)
    })
  }

  getPage(pdf, pageNumber, numPages) {
    const _this = this
    pdf.getPage(pageNumber)
      .then((page) => {
        // 获取DOM中为预览PDF准备好的canvasDOM对象
        const canvas = document.getElementById('pdf-canvas');
        const viewport = page.getViewport(1.5)
        canvas.height = viewport.height
        canvas.width = viewport.width

        const ctx = canvas.getContext('2d')
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext).then(() => {
          pageNumber += 1
          if (pageNumber <= numPages) {
            _this.getPage(pdf, pageNumber, numPages)
          }
        })
      })
  }

  render() {
    return(
      <div>
        <p>111</p>
        <canvas id="pdf-canvas"></canvas>
      </div>
    );
  }
}

PdfComponent.propTypes = {
  url: propTypes.string,
};

 module.exports = PdfComponent;
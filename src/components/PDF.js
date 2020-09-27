import React, { useState, useRef } from 'react';

const PDF = () => {
    const [pageNum, setPageNum] = useState(0);

    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    // var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
    // var url = 'https://web.stanford.edu/class/archive/cs/cs103/cs103.1126/lectures/03/Slides03.pdf'
    var url = 'http://localhost:8080/math1.pdf'

    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window['pdfjs-dist/build/pdf'];

    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    var pdfDoc = null;
    var pageRendering = false;
    var pageNumPending = null;
    var scale = 2.5;
    var canvas = document.getElementById('the-canvas');
    //var ctx = canvas.getContext('2d');


    const renderPage = num => {
        pageRendering = true;

    // use promise
    pdfDoc.getPage(num).then(page => {
        var viewport = page.getViewport({scale:1});
        var desiredWidth = 1000;
        var scaleNew = desiredWidth / viewport.width;
        viewport = page.getViewport({scale: scaleNew})
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            //canvasContext: ctx,
            viewport: viewport
        };
        
        var renderTask = page.render(renderContext);
        
        renderTask.promise.then(() => {
        pageRendering = false;
        //Array of keypoints

        //Drawing line
        //ctx.beginPath();
        //ctx.moveTo(keypoints[5].x, keypoints[5].y);
        //ctx.fill();
        
        if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
        }
        });
    });

    document.getElementById('page_num').textContent =  num;
    
    }

    const queueRenderPage = num => {
    if (pageRendering) {
        pageNumPending = num;
    }
    else {
        renderPage(num);
    }
    }

    const onPrevPage = () => {
        if (pageNum <= 1) {
            return;
        }
        setPageNum(--pageNum);
        queueRenderPage(pageNum);
    }
    //document.getElementById('prev').addEventListener('click', onPrevPage);


    const onNextPage = () => {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        setPageNum(++pageNum);
        queueRenderPage(pageNum);
    }
    //document.getElementById('next').addEventListener('click', onNextPage)

    pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    //document.getElementById('page_count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
    })

    return (
        <div>
            <div>
                <button id="prev" onClick={onPrevPage}>Previous</button>
                <button id="next" onClick={onNextPage}>Next</button>
                &nbsp; &nbsp;
                <span>Page: <span id="page_num"></span> / <span id="page_count">{pageNum}</span></span>
            </div>
            <canvas id="the-canvas"></canvas>
        </div>
    )   
}

export default PDF;
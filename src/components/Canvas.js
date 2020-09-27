import React, { useRef, useEffect, useState } from 'react'

const Canvas = props => {

    var url = 'http://localhost:8080/math1.pdf'
    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    const [pageNum, setPageNum] = useState(1);
    var ctx = null;
    // const [ctx, setCtx] = useState('null')
    const [pageRendering, setPageRendering] = useState(false);
    const [pageNumPending, setPageNumPending] = useState(null);
    var numPages = 5;
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);

    var pdfDoc = null;
    var scale = 2.5;
    //var canvas = document.getElementById('the-canvas');
    //var ctx = canvas.getContext('2d');

    const queueRenderPage = num => {
        if (pageRendering) {
            setPageNumPending(num);
        }
        else {
            renderPage(num);
        }
    }

    const onPrevPage = () => {
        if (pageNum <= 1) {
            return;
        }
        setPageNum(pageNum - 1);
        queueRenderPage(pageNum);
    }

    const onNextPage = () => {
        if (pageNum >= numPages) {
            return;
        }
        setPageNum(pageNum + 1);
        queueRenderPage(pageNum);    
    }

    const renderPage = num => {
        setPageRendering(true);

        pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            numPages = pdfDoc.numPages;
            pdfDoc.getPage(num).then(page => {
                var viewport = page.getViewport({scale:1});
                var desiredWidth = 480;
                var scaleNew = desiredWidth / viewport.width;
                viewport = page.getViewport({scale: scaleNew})
                setHeight(viewport.height);
                setWidth(viewport.width);
    
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                var renderTask = page.render(renderContext);
                
                renderTask.promise.then(() => {
                    setPageRendering(false);               
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        setPageNumPending(null);
                    }
                });
            });
            //renderPage(ctx, num);
        })
       
    };

    const canvasRef = useRef(null);
    
    const draw = ctx => {
        ctx.fillStyle = "red";

        ctx.beginPath();
        console.log(props.points.length);
        if (props.points.length >= 1) {
            ctx.moveTo(props.points[0], props.points[1]);
            console.log(props.points);
        }
        for (var i = 3; i < props.points.length; i += 3) {
            ctx.lineTo(props.points[i], props.points[i+1])
        }
        ctx.fill();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        ctx = context;
        renderPage(pageNum);
        draw(ctx);
    }, [pageNum, props.points]);

    return (
        <div>
            <div>
                <button id="prev" onClick={onPrevPage}>Previous</button>
                <button id="next" onClick={onNextPage}>Next</button>
                &nbsp; &nbsp;
                <span>Page: <span id="page_num"></span> / <span id="page_count">{numPages}</span></span>
            </div>
            <canvas ref={canvasRef} {...props} height={height} width={width}/>
        </div>
    )
}

export default Canvas;
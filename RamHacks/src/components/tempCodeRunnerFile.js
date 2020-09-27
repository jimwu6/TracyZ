var renderTask = page.render(renderContext);
                
                renderTask.promise.then(() => {
                    setPageRendering(false);                   
                    if (pageNumPending !== null) {
                        console.log('x');
                        console.log(ctx);
                        renderPage(pageNumPending);
                        setPageNumPending(null);
                    }
                });
import { useEffect } from "react";

export function Signature(props) {
    let canDraw = false;   
    const WIDTH = 400;
    const HEIGHT = 200;
    let mousePos = {x: 0, y: 0};
    let lastPos = mousePos;
    
    function Init() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", (e) => {
            lastPos = {x: e.offsetX, y: e.offsetY};
            canDraw = true;
            drawLine(ctx, lastPos);
        });
    
        canvas.addEventListener("mouseup", (e) => {
            canDraw = false;
            saveSignURL(canvas);
        });
    
        canvas.addEventListener("mousemove", (e) => {
            mousePos = {x: e.offsetX, y: e.offsetY};
            drawLine(ctx, mousePos);
        });
    
        canvas.addEventListener("touchstart", (e) => {
            canDraw = true;
            lastPos = getTouchPos(canvas, e.touches[0]);
            drawLine(ctx, lastPos);
        });
    
        canvas.addEventListener("touchend", (e) => {
            canDraw = false;
            saveSignURL(canvas);
        });
    
        canvas.addEventListener("touchmove", (e) => {
            mousePos = getTouchPos(canvas, e.touches[0]);
            drawLine(ctx, mousePos);
        });
        
        document.body.addEventListener("touchstart", function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchend", function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchmove", function(e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        }, false);
        
        var clearBtn = document.getElementById("clearSign");
        function saveSignURL(canvas) {
            var signatureUrl = canvas.toDataURL();
            props.setSignatureURL(signatureUrl);
        }
    
        clearBtn.addEventListener("click", (e) => {
            clearScreen(ctx, WIDTH, HEIGHT, canvas);
            saveSignURL(canvas);
        });
    }

    function clearScreen(ctx, WIDTH, HEIGHT, canvas) {
        // ctx.fillStyle = "white";
        // ctx.fillRect(0, 0, WIDTH, HEIGHT);   
        canvas.width = WIDTH;
    }

    function handleClear(e) {
        e.preventDefault();
    }

    function drawLine(ctx, mousePos) {
        if (canDraw) {
            ctx.beginPath();
            ctx.strokeStyle = "#505050";
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();

            lastPos = mousePos;
            
        }
    }

    function getTouchPos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top}
    }

    useEffect(() => {
        Init();
    });

    return <>
        <canvas width="400" height="200" id="myCanvas"></canvas>
        <button id="clearSign" onClick={handleClear}>Clear Signature</button>
    </>
}
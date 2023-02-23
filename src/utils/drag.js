//封装的touch事件，接收4个参数，滑动对象，开始函数，移动函数，结束函数，具体用法，自己看源码 
export const touch = function (obj, startFun, moveFun, endFun) {
    var coord = {},
        start = {},
        el;
    obj.addEventListener('touchstart', touchStart, { passive: true });
    obj.addEventListener('touchmove', touchMove, { passive: true });
    obj.addEventListener('touchend', touchEnd, { passive: true });
    obj.addEventListener('touchcanel', touchCancel, { passive: true });
    function newEvent(type) {
        return new Event(type, { bubbles: true, cancelable: true });
    }
    function touchCancel() {
        coord = {}
    }
    function touchStart(e) {
        var c = e.touches[0];
        start = {
            x: c.clientX,
            y: c.clientY,
            time: Date.now()
        };
        el = e.target;
        el = 'tagName' in el ? el : el.parentNode;
        if (startFun) {
            startFun(e);
        }
    }
    function touchMove(e) {
        console.log(e)
        var t = e.touches[0];
        coord = {
            x: t.clientX - start.x,
            y: t.clientY - start.y
        };
        if (moveFun) {
            moveFun(e, coord);
        }
    }
    function touchEnd() {
        var touchTimes = Date.now() - start.time,
            c = 250 > touchTimes && Math.abs(coord.x) > 20 || Math.abs(coord.x) > 80,
            s = 250 > touchTimes && Math.abs(coord.y) > 20 || Math.abs(coord.y) > 80,
            left = coord.x < 0,
            top = coord.y < 0;
        if (250 > touchTimes && (isNaN(coord.y) || Math.abs(coord.y)) < 12 && (isNaN(coord.x) || Math.abs(coord.x) < 12)) {
            el.dispatchEvent(newEvent('tap'));
        } else if (750 < touchTimes && (isNaN(coord.y) || Math.abs(coord.y)) < 12 && (isNaN(coord.x) || Math.abs(coord.x) < 12)) {
            el.dispatchEvent(newEvent('longTap'));
        }
        c ? el.dispatchEvent(left ? newEvent('swipeLeft') : newEvent('swipeRight')) : s && el.dispatchEvent(top ? newEvent('swipeUp') : newEvent('swipeDown'));
        if (endFun) {
            endFun(coord);
        }
        coord = {};
    }
};

//拖拽事件 的封装，依赖上面touch 事件， 传入拖拽dom对象 
export const dragw = function (drag, callBack) {
    const wheight = window.innerHeight;
    var startX, startY, dx, dy;
    var x = drag.offsetLeft;
    var y = drag.offsetTop;
    const cHeight = drag.clientHeight / 2;
    const cWidth = drag.clientWidth / 2;
    touch(drag, startFun, touchMove, touchEnd)
    function startFun(event) {
        event.preventDefault();
        //拿到这个手指 
        var thefinger = event.touches[0];
        //记录开始触摸的位置 
        startX = thefinger.clientX;
        startY = thefinger.clientY;
        isDrag = true;
        setTimeout(() => {
            if (isDrag) {
                if (callBack) {
                    callBack();
                }
            }
        }, 300)
    };
    function touchMove(event, coord) {
        if (coord && Math.abs(coord.x) > 5) {//认定是滑动 
            isDrag = false;
            //拿到这个手指 
            var thefinger = event.touches[0];
            //记录开始触摸的位置 
            dx = thefinger.clientX - startX;
            dy = thefinger.clientY - startY;
            drag.style.left = startX - cHeight + dx + 'px';
            drag.style.top = startY - cWidth + dy + 'px';
            if (startY - cWidth + dy <= 0) {
                drag.style.top = 0;
            }
            if (startY - cWidth + dy >= wheight - cWidth * 2 - 61) {
                drag.style.top = wheight - cWidth * 2 - 61 + 'px';
            }
            if (startX - cHeight + dx < 10) {
                drag.style.left = 0;
            }
            if (startX - cHeight + dx >= innerWidth - cWidth * 2) {
                drag.style.left = innerWidth - cWidth * 2 + 'px';
            }
        }
    };
    function touchEnd(coord) {
        // if(startX-cHeight + dx<innerWidth/2){ 
        // drag.style.left = 0; 
        // } 
        // if(startX-cHeight + dx>=innerWidth/2){ 
        // drag.style.left = innerWidth-cWidth*2+'px'; 
        // } 
    }
}
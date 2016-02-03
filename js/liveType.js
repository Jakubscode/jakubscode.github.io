function LiveType(element,string,timeOut,callback) {
    var el = element;
    el.innerHTML = string;
    el.style.width = el.offsetWidth + 40 + 'px';
    el.innerHTML = '';
    var callback = callback;
    var timeOut = timeOut;
    var str = string;
    var counter = 0;
    this.start = function() {
        var interval = window.setInterval(function() {
            el.innerHTML = str.substr(0,counter++) + "|";
            if (counter > string.length){
                window.clearInterval(interval);
                setCursor();
                callback();
            } 
        },timeOut)
        var i = false;
        var setCursor = function() {
            var cursor = window.setInterval(function() {
                if (i) {
                    el.innerHTML = el.innerHTML.substr(0,el.innerHTML.length-1) + "|";
                    i = false;
                } else {
                    el.innerHTML = el.innerHTML.substr(0,el.innerHTML.length-1) + '&#32';
                    i = true;
                }
            },800)   
        }
        
    }  
}
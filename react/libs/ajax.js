var Ajax = function() {
    var ajax = new XMLHttpRequest();
    var callback;
    this.get = function(url,dataStr,cback) {
        callback = cback;
        ajax.open("GET", url+'?'+dataStr,true);
        ajax.onreadystatechange = ajaxResponse;
        ajax.send(null);
    }
    this.post = function(url,dataStr,cback) {
        callback = cback;
        ajax.open("POST", url, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.onreadystatechange = ajaxResponse;
        ajax.send(dataStr);
    }
    var ajaxResponse = function() {
        if (ajax.readyState == 4) {
            var substr = this.responseText.substr(0,1);
            var dane = (substr == '{' || substr == '[') ?  eval('('+this.responseText+')') : this.responseText; 
            callback(dane);
        }
    }
}
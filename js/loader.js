var Loader = function(loaderNode, callback) {
    var imgs = document.getElementsByTagName('img');
    var links = document.getElementsByTagName('link');
    var scripts = document.getElementsByTagName('script');
    var styles = document.getElementsByTagName('style');
    var itemsLength = imgs.length + links.length + scripts.length + styles.length;
    //alert('items to load '+itemsLength);
    console.log('items to load '+itemsLength);
    var loadedItems = 0;
    var updateLoader = function () {
        loaderNode.innerHTML = Math.round(loadedItems/itemsLength*100)+'%';
    }
    var onItemLoad = function() {
        loadedItems++;
        updateLoader();
    }
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('load',onItemLoad);
    };
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('load',onItemLoad);
    };
    for (var i = 0; i < scripts.length; i++) {
        scripts[i].addEventListener('load',onItemLoad);
    };
    for (var i = 0; i < styles.length; i++) {
        styles[i].addEventListener('load',onItemLoad);
    };
    if (callback) {
        window.addEventListener('load',callback);
    }
    else 
        console.error('Loader -> Callback function is undefined.');
 
};
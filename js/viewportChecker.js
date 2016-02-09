/* New event in linked file.js */
function ViewportCheckerElement(HTMLElement, intoVp, outOfVp) {
    this.node = HTMLElement;
    this.vpIn = intoVp;
    this.vpOut = outOfVp;
}
ViewportCheckerElement.prototype.isInVp = function(scrollDown,fromTop,bottomScale) {
    var rect = this.node.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    var height = (rect.bottom - rect.top-fromTop);
    if (-(height) < rect.top && rect.top < windowHeight*bottomScale) 
        this.vpIn(this.node, scrollDown);
    else 
        this.vpOut(this.node, scrollDown);
}
ViewportCheckerElement.prototype.fuckedUp = function() { return "Im fucked up" + this.node.nodeName;}
function ViewportChecker(fromTop,bottomScale) {
    var vpElements = [];
    var scrollDown = true;
    var lastScrollPos = 0;
    var fromTop = fromTop || 0;
    var bottomScale = bottomScale || 1.0;
    
    this.add = function(HTMLElement, intoVp, outOfVp) {
        vpElements.push(new ViewportCheckerElement(HTMLElement, intoVp, outOfVp));
    }    
    var checkVp = function() {
        scrollDown = (lastScrollPos - window.scrollY) < 0  
        lastScrollPos = window.scrollY;
        for(var i = 0; i<vpElements.length; i++) {
            vpElements[i].isInVp(scrollDown,fromTop,bottomScale);
            //console.log(vpElements[i].fuckedUp());
        }
    }
    window.addEventListener("scroll",checkVp);
    window.addEventListener("wheel",checkVp);
    window.addEventListener("load",checkVp);
    this.check = checkVp;
}

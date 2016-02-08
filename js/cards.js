function Cards(className) {
    var screenH = window.innerHeight;
    var cards = document.querySelectorAll(className);
    var cc = 0; //currentCard
    var animationTime = 1000;
    var cardChangeCallback;
    var prevIndex = function() {
        return cc > 0 ? cc-1 : cards.length-1
    }
    var nextIndex = function() {
        return cc < cards.length-1 ? cc+1 : 0
    }
    var canIScroll = true;
    for (var i = 0; i < cards.length; i++) {
        (function(i) {
            cards[i].addEventListener('animationend', function() {
                if (this.getAttribute('data-anim') == "toTop" || this.getAttribute('data-anim') == "toBottom" ) 
                    this.classList.add('hide');
                else 
                    this.style.top = '0px';
                this.style.animation = 'none'; 
                scrollOn();
            });
        })(i);
    }
    var next = function(cardNum) {
        scrollOff(); //wyłączam scroll na czas animacji
        var next = cardNum != undefined ? cardNum : nextIndex();
        cards[cc].style.animation = "toTop 1000ms 1";
        cards[cc].setAttribute('data-anim', 'toTop');
        cards[next].classList.remove('hide');
        cards[next].style.animation = "fromBottomToCenter " + animationTime + "ms 1";
        cards[next].setAttribute('data-anim', 'fromBottomToCenter');
        makeMenuElActive(cc,next);
        if (cardChangeCallback) cardChangeCallback(cc,next,animationTime);
        cc = next;
    }
    var prev = function(cardNum) {
        scrollOff(); //wyłączam scroll na czas animacji
        var next = cardNum != undefined ? cardNum : prevIndex();
        cards[cc].style.animation = "toBottom 1000ms 1";
        cards[cc].setAttribute('data-anim', 'toBottom');
        cards[next].classList.remove('hide');
        cards[next].style.animation = "fromTopToCenter " + animationTime + "ms 1";
        cards[next].setAttribute('data-anim', 'fromTopToCenter');
        makeMenuElActive(cc,next);
        if (cardChangeCallback) cardChangeCallback(cc,next,animationTime);
       
        cc = next;
    }
    var moveTo = function(cardNum) {
        if (cc > cardNum) prev(cardNum)
        else if (cc < cardNum) next(cardNum)
        
    }
    var scrollOn = function() {
        canIScroll = true;
        //console.warn("Cards.js -> Scroll is on");
    }
    var scrollOff = function() {
        canIScroll = false;
        //console.warn("Cards.js -> Scroll is off");

    }
    this.next = next;
    this.prev = prev;
    this.moveTo = moveTo;
    
    this.setCard = function(num) {
        cc = num;
    }
    this.scrollOn = scrollOn;
    this.scrollOff = scrollOff;
    
    this.setCardChangeCallback = function(func) {
        cardChangeCallback = func;
    }
    var menuElemens = [];
    this.showMenu = function(element, listNodeType, listNodeClass) {
        for (var i = 0; i < cards.length; i++) {
            var li = document.createElement(listNodeType);
            li.classList.add(listNodeClass);
            if (i == 0) li.classList.add('active');
            li.addEventListener('click', moveTo.bind(null,i));
            element.appendChild(li);
            menuElemens.push(li);
            //console.log(cardChangeCallback);
        }
    }
    function makeMenuElActive(cc,next) {
        if (menuElemens.length > 0) {
            menuElemens[cc].classList.remove('active');
            menuElemens[next].classList.add('active');
        }
        else console.warn('Menu Elements Array is empty');
    }
    
    window.addEventListener('wheel', function(event) {
        //console.log('Scroll is enable: ', canIScroll);
        if (canIScroll) {
            scrollOff();
            if (event.deltaY > 0) 
                next();
            else 
                prev();
            window.setTimeout(scrollOn, 1000);
        } 
    });
}
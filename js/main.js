/* === CARDS SETUP === */
var cards = {};
cards.class = new Cards('.card');
cards.cards = [];
var firstCard = [];
var stars = document.querySelectorAll('.stars');
var range = [300,200,100];
for (var i=0; i<stars.length; i++) {
    firstCard.push( new float(stars[i],range[i], range[i], true) );
}
cards.cards.push(firstCard);
var about = [];
about.push( new float(document.querySelector('#desk'),300,0,true));
about.push( new float(document.querySelector('#retroDesk'),300,0,true));
cards.cards.push(about);
var thirdCard = [];
/*thirdCard.push( new float(document.getElementById('sky'),50,00,true) );
thirdCard.push( new float(document.getElementById('mountains2'),70,0,true) );
thirdCard.push( new float(document.getElementById('mountains1'),100,0,true) );*/
cards.cards.push(thirdCard);
cards.cards.push([]); //czwarta karta
var cardsMenuElement = document.querySelector('.cardsNav');
var cardChangeCallback = function(cc,nc,time) {
    console.log('CardChangeCallback');
    for (var i = 0; i< cards.cards[cc].length; i++) {
        //console.log(i,cards.cards[cc], cards.cards[cc][i]);
        cards.cards[cc][i].Off();
    }
    for (var i = 0; i< cards.cards[nc].length; i++) {
        //console.log(i,cards.cards[cc], cards.cards[cc][i]);

        cards.cards[nc][i].On();
    }
    switch(nc) {
        case 2: console.log('Następna karta 3'); /*cards.class.scrollOff();*/
        break;
    }
    window.setTimeout(vpChecker.check,time);
}
cards.class.showMenu(cardsMenuElement, 'p', "cardsNavEl");
cards.class.setCardChangeCallback(cardChangeCallback);

var nextButtons = document.querySelectorAll('.nextButton');
for(var i = 0; i < nextButtons.length; i++) {
    nextButtons[i].addEventListener('click', function() {
        cards.class.next();
    })
}
/* --- CARDS SETUP --- */
/* === VIEWPORT CHECKER === */
var vpChecker = new ViewportChecker(0,0.8);

/*vpChecker.add(portrait, 
    function(node) {
        node.classList.remove('opacity0');
        node.classList.add('fadeIn');
    },
    function() {
    
    }
);
vpChecker.add(description, 
    function(node) {
        node.classList.add('slideUp');
    },
    function() {
    
    }
);*/


/* --- VIEWPORT CHECKER --- */


/* === FIRST CARD === */

var portrait = document.querySelector('.portrait');
var description1 = document.querySelector('p.code');
var description2 = document.querySelectorAll('p.code')[1];


var welcomeType = new LiveType(document.getElementById('welcome'), "Cześć! Jestem Kuba :).", 80, function() {
    portrait.classList.remove('opacity0');
    portrait.classList.add('fadeZoomIn');
    window.setTimeout(function() {
        description1.classList.remove('opacity0');
        description1.classList.add('slideUp');
    },800);
    window.setTimeout(function() {
        description2.classList.remove('opacity0');
        description2.classList.add('slideUp');
    },2000);
    window.setTimeout(function() {
        nextButtons[0].classList.remove('opacity0');
        nextButtons[0].classList.add('fadeIn');

    },2500)
    window.setTimeout(function() {
        nextButtons[0].classList.remove('fadeIn');
        nextButtons[0].classList.add('pulse');

    },3000)
});

/* --- FIRST CARD ---*/

/* === SKILLS CARD ===*/

function skillsIn() { //function will be invoked in cardChangeCallback();
    //console.log('skillsIn()');
    var skillsListLeft = document.querySelectorAll('.skillsList > li:nth-child(2n+1)');
    var skillsListRight = document.querySelectorAll('.skillsList > li:nth-child(2n)');
    for (var i = 0; i < skillsListLeft.length; i++ ) {
        vpChecker.add(skillsListLeft[i],
            function(el) {
                el.classList.remove('opacity0');
                el.classList.add('slideDownLeftFadeIn');
                el.addEventListener('animationend',function() {
                    //this.classList.add('bluredBG');
                });
            },
            function(){}
        );
        //console.log('SkillAded');
    }
    for (var i = 0; i < skillsListRight.length; i++ ) {
        vpChecker.add(skillsListRight[i],
            function(el) {
                el.classList.remove('opacity0');
                el.classList.add('slideDownRightFadeIn');
                el.addEventListener('animationend',function() {
                    //this.classList.add('bluredBG');
                });
            },
            function(){}
        );
        //console.log('SkillAded');
    }
}
skillsIn();
var skillsHeaders = document.querySelectorAll('.skills h2, .skills h3');
for (var i = 0; i < skillsHeaders.length; i++ ) {
    vpChecker.add(skillsHeaders[i],
        function(el) {
            el.classList.remove('opacity0');
            el.classList.add('fadeZoomIn');
        },
        function(){}
    );
}
/* FORCE SCROLL OFF */
cards.class.forceScrollOff(2);

var content = document.querySelector('.skills .scroll');
var contentTopElement = content.firstElementChild;
var contentTopElementMargin = parseFloat(window.getComputedStyle(contentTopElement).marginTop);
//console.log(contentTopElementMargin);
var contentBottomElement = content.lastElementChild;
var contentBottomElementMargin = parseFloat(window.getComputedStyle(contentBottomElement).marginBottom);


function isSkillsCardScrolledTop() {
    var topRect = content.firstElementChild.getBoundingClientRect();
    var bottomRect = content.lastElementChild.getBoundingClientRect();
    //console.log(topRect.top - contentTopElementMargin, bottomRect.bottom - window.innerHeight);
    return Math.abs(topRect.top - contentTopElementMargin) < 1;
}
function isSkillsCardScrolledBottom() {
    var topRect = content.firstElementChild.getBoundingClientRect();
    var bottomRect = content.lastElementChild.getBoundingClientRect();
    //console.log(bottomRect.bottom + contentBottomElementMargin  - window.innerHeight);
    return Math.abs(bottomRect.bottom + contentBottomElementMargin - window.innerHeight <1);
}
content.addEventListener('wheel',function(event) {
    //console.log(isSkillsCardScrolled());
    //console.log(event.deltaY);
    if (cards.class.currentCard() == 2) //prevent bugs when card is partly scrolled
        if (event.deltaY > 0) {
            if (isSkillsCardScrolledBottom()) {
                console.log('scrolled to bottom');
                cards.class.scrollOn();
            }
            else
                cards.class.scrollOff();
        }
        else 
            if (isSkillsCardScrolledTop())  { 
                console.log('scrolled to top');
                cards.class.scrollOn();
            }
            else
                cards.class.scrollOff();
    
});
/*content.addEventListener('scroll',function() {
    //console.log(isSkillsCardScrolled());
    console.log(event.deltaY);
    if (isSkillsCardScrolled()) {
        window.setTimeout(cards.class.scrollOn,1000);
    }
    else
        cards.class.scrollOff();
});/*
/* --- SKILLS CARD --*/

/* === GENERAL === */
var loaderCounter = document.querySelector('.loaderCount');
var removeLoader = function() {
    loaderCounter.parentNode.parentNode.removeChild(loaderCounter.parentNode);
    welcomeType.start();
}
var loader = new Loader(loaderCounter,function() {
    loaderCounter.innerHTML = "100%";
    loaderCounter.style.webkitAnimation = "out 1s 1";
    loaderCounter.style.animation = "out 1s 1";
    loaderCounter.addEventListener("webkitAnimationEnd", removeLoader);
    loaderCounter.addEventListener("animationend", removeLoader);
});
window.addEventListener('load', function() {
    
})
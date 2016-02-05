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
var secondCard = [];
secondCard.push( new float(document.getElementById('float'),100,100,true) );
secondCard.push( new float(document.getElementById('button4'),window.innerWidth,window.innerHeight,true));
//console.log(firstCard.length, firstCard[0].Off(), firstCard[2].Off(), firstCard[1].Off());
cards.cards.push(secondCard);
var thirdCard = [];
thirdCard.push( new float(document.getElementById('sky'),50,00,true) );
thirdCard.push( new float(document.getElementById('mountains2'),70,0,true) );
thirdCard.push( new float(document.getElementById('mountains1'),100,0,true) );
cards.cards.push(thirdCard);
cards.cards.push([]); //czwarta karta
var cardsMenuElement = document.querySelector('.cardsNav');
var cardChangeCallback = function(cc,nc) {
    console.log('Wyłączam');
    for (var i = 0; i< cards.cards[cc].length; i++) {
        console.log(i,cards.cards[cc], cards.cards[cc][i]);
        cards.cards[cc][i].Off();
    }
    for (var i = 0; i< cards.cards[nc].length; i++) {
                console.log(i,cards.cards[cc], cards.cards[cc][i]);

        cards.cards[nc][i].On();
    }
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
var vpChecker = new ViewportChecker();

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
document.getElementById('button4').addEventListener('click', function() {
    alert('points');
});

/* === FIRST CARD === */

var portrait = document.querySelector('.portrait');
var description1 = document.querySelector('p.code');
var description2 = document.querySelectorAll('p.code')[1];


var welcomeType = new LiveType(document.getElementById('welcome'), "Cześć! Jestem Kuba :).", 80, function() {
    portrait.classList.remove('opacity0');
    portrait.classList.add('fadeIn');
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
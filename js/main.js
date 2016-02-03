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
var secondCard = [];
secondCard.push( new float(document.getElementById('float'),100,100,true) );
secondCard.push( new float(document.getElementById('button4'),window.innerWidth,window.innerHeight,false));
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
var portrait = document.querySelector('.portrait');
var description = document.querySelector('p.code');
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
var welcomeType = new LiveType(document.getElementById('welcome'), "Cześć! Jestem Kuba :).", 80, function() {
    portrait.classList.remove('opacity0');
    portrait.classList.add('fadeIn');
    window.setTimeout(function() {
        description.classList.remove('opacity0');
        description.classList.add('slideUp');
    },400);
    window.setTimeout(function() {
        nextButtons[0].classList.remove('opacity0');
        nextButtons[0].classList.add('fadeIn');

    },1500)
    window.setTimeout(function() {
        nextButtons[0].classList.remove('fadeIn');
        nextButtons[0].classList.add('pulse');

    },2800)
});
window.addEventListener('load', function() {
    welcomeType.start();
})
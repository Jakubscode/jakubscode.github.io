var Example = Example || {}; Example["module"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _App = __webpack_require__(1);

	var _App2 = _interopRequireDefault(_App);

	__webpack_require__(9);
	__webpack_require__(13);
	(function () {
	  var playGround = document.querySelector("#playGround");
	  var backGround = document.querySelector("#backGround");

	  var app = new _App2["default"](playGround, backGround);
	  /*
	  const speedBar = document.createElement("input");
	  speedBar.setAttribute("type", "range");
	  speedBar.setAttribute("min", "1");
	  speedBar.setAttribute("max", "25");
	  speedBar.setAttribute("value", "5");
	  speedBar.classList.add("speedBar");
	  document.body.appendChild(speedBar);
	  speedBar.addEventListener("change", function(event) {
	    app.setSpeed(parseInt(event.target.value));
	  })
	  */
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _classesBall = __webpack_require__(2);

	var _classesBall2 = _interopRequireDefault(_classesBall);

	var _classesBar = __webpack_require__(4);

	var _classesBar2 = _interopRequireDefault(_classesBar);

	var _classesEffects = __webpack_require__(3);

	var _classesEffects2 = _interopRequireDefault(_classesEffects);

	var _classesLevels = __webpack_require__(5);

	var _classesLevels2 = _interopRequireDefault(_classesLevels);

	var App = (function () {
	  function App(playGround, backGround) {
	    _classCallCheck(this, App);

	    this.canvas = { playGround: playGround, backGround: backGround };
	    this.setupCanvas();
	    this.levels = _classesLevels2["default"];
	    this.game = {
	      "continue": true,
	      points: 0,
	      hits: 0,
	      lives: 0,
	      level: 0
	    };
	    this.playGround = {
	      offset: {
	        top: 50,
	        left: 30,
	        right: 30,
	        bottom: 30
	      },
	      width: this.canvas.playGround.width,
	      height: this.canvas.playGround.height
	    };
	    this.effects = new _classesEffects2["default"]();
	    this.layout = {
	      buttons: {
	        restart: this.createResterButton()
	      },
	      display: {
	        points: this.createPointsDisplay()
	      }
	    };
	    this.balls = [];
	    this.balls.push(new _classesBall2["default"]({ context: this.context.playGround, color: "black", radius: 20 }));
	    this.bar = new _classesBar2["default"]({
	      context: this.context.playGround,
	      color: "blue",
	      width: this.canvas.playGround.width / 5,
	      height: 20,
	      x: this.canvas.playGround.width / 2,
	      y: this.canvas.playGround.height - this.playGround.offset.top,
	      playGround: this.playGround
	    });

	    //this.createResterButton();
	    this.renderBackGround(this.playGround.offset);
	    this.renderPlayGround(this.playGround.offset);
	  }

	  _createClass(App, [{
	    key: "getGameState",
	    value: function getGameState() {
	      return {
	        points: this.game.points,
	        hits: this.game.hits,
	        playGround: this.context.playGround,
	        backGround: this.context.backGround,
	        balls: this.balls
	      };
	    }
	  }, {
	    key: "setupCanvas",
	    value: function setupCanvas() {
	      var relation = window.innerHeight / window.innerWidth;
	      this.canvas.playGround.width = 1600;
	      this.canvas.playGround.height = this.canvas.playGround.width * relation;
	      this.canvas.backGround.width = 1600;
	      this.canvas.backGround.height = this.canvas.backGround.width * relation;

	      this.context = {
	        playGround: this.canvas.playGround.getContext("2d"),
	        backGround: this.canvas.backGround.getContext("2d")
	      };
	    }
	  }, {
	    key: "createResterButton",
	    value: function createResterButton() {
	      var button = document.createElement("button");
	      button.classList.add("restartBtn");
	      button.innerHTML = "RESTART";
	      document.body.appendChild(button);
	      button.addEventListener("click", (function (ev) {
	        ev.preventDefault();
	        this.game["continue"] = false;
	        this.resetGame();
	      }).bind(this));
	      return button;
	    }
	  }, {
	    key: "createPointsDisplay",
	    value: function createPointsDisplay() {
	      var points = document.createElement("p");
	      points.classList.add("pointsDisplay");
	      points.innerHTML = "0";
	      document.body.appendChild(points);
	      return points;
	    }
	  }, {
	    key: "resetGame",
	    value: function resetGame() {
	      this.balls[0].setPosition({ x: 0, y: 0 });
	      this.balls[0].setDirection({ x: 7, y: 7 });
	      this.bar.state.apperance.width = this.canvas.playGround.width / 5;
	      this.balls[0].setColor();
	      this.bar.setColor();

	      this.game.points = 0;
	      this.game.hits = 0;
	      this.game["continue"] = true;
	      this.renderBackGround(this.playGround.offset);
	      this.renderPlayGround(this.playGround.offset);
	    }
	  }, {
	    key: "renderGameOver",
	    value: function renderGameOver() {
	      var settings = {
	        position: {
	          x: this.canvas.playGround.width / 4,
	          y: this.canvas.playGround.height / 2
	        },
	        color: this.effects.randomizeColor,
	        text: "You are gonna to be late mother*ucker",
	        font: "40px Serif",
	        context: this.context.backGround
	      };
	      this.effects.fadeInText(settings);
	    }
	  }, {
	    key: "renderBackGround",
	    value: function renderBackGround(offset) {
	      var context = this.context.backGround;
	      var width = this.canvas.backGround.width;
	      var height = this.canvas.backGround.height;
	      context.clearRect(0, 0, width, height);

	      context.fillStyle = "#1589FF";
	      /* Top and bottom*/
	      context.fillRect(0, 0, width, offset.top);
	      context.fillRect(0, height - offset.bottom, width, offset.bottom);
	      /*left and right */
	      context.fillRect(width - offset.right, 0, offset.right, height);
	      context.fillRect(0, 0, offset.left, height);
	    }
	  }, {
	    key: "checkBallHits",
	    value: function checkBallHits(ball, number) {
	      var radius = ball.state.apperance.radius;
	      var offset = this.playGround.offset;
	      /* bounce Left and Right */
	      if (ball.state.position.x > this.canvas.playGround.width - radius - offset.right && ball.state.direction.x > 0 || ball.state.position.x < radius + offset.left && ball.state.direction.x < 0) {
	        var x = ball.state.direction.x *= -1;
	        ball.setDirection({ x: x });
	        ball.setColor();
	        this.game.points++;
	        this.game.hits++;
	      }
	      /* bounce Top */
	      if (ball.state.position.y < radius + offset.top && ball.state.direction.y < 0) {
	        var y = ball.state.direction.y *= -1;
	        ball.setDirection({ y: y });
	        ball.setColor();
	        this.game.points++;
	        this.game.hits++;
	      }
	      /* bounce Bar */
	      if (ball.state.position.y + ball.state.apperance.radius >= this.bar.state.position.y && ball.state.direction.y > 0) {
	        if (ball.state.position.x + ball.state.apperance.radius > this.bar.state.position.x && ball.state.position.x - ball.state.apperance.radius < this.bar.state.position.x + this.bar.state.apperance.width) {
	          var y = ball.state.direction.y *= -1;
	          ball.setDirection({ y: y });
	          this.bar.setColor(ball.setColor());
	          this.game.points++;
	          this.game.hits++;
	          if (Math.random() < 0.4) {
	            ball.speedUp(1.1);
	            console.log("speedUp");
	          }
	          /*
	          if (Math.random() > 0.7)
	            if (this.bar.state.apperance.width > 100)
	              this.bar.state.apperance.width -= 50;
	          */
	        } else {
	          if (number > 0) {
	            this.balls.splice(number, 1);
	          } else {
	            this.game["continue"] = false;
	            this.renderGameOver();
	          }
	        }
	      }
	    }
	  }, {
	    key: "renderPlayGround",
	    value: function renderPlayGround(offset) {
	      var context = this.context.playGround;

	      context.clearRect(0, 0, this.canvas.playGround.width, this.canvas.playGround.height);

	      /* Render Level */
	      this.game["continue"] = !this.levels[this.game.level].levelCompleted(this.getGameState());
	      if (this.game["continue"]) {
	        this.levels[this.game.level].render(this.getGameState());
	        for (var i = 0; i < this.balls.length; i++) {
	          this.checkBallHits(this.balls[i], i);
	          if (this.balls[i] !== undefined) {
	            // may be deleted
	            this.balls[i].reflexPosition();
	            this.balls[i].render();
	          }
	        }
	        /* add points */
	        this.layout.display.points.innerHTML = this.game.points;
	        this.bar.render();
	        if (this.game["continue"]) window.requestAnimationFrame(this.renderPlayGround.bind(this, offset));
	      } else {
	        alert("Level " + (this.game.level + 1) + " completed!");
	      }
	    }
	  }]);

	  return App;
	})();

	module.exports = App;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Effects = __webpack_require__(3);

	var _Effects2 = _interopRequireDefault(_Effects);

	var Ball = (function () {
	  function Ball(settings) {
	    _classCallCheck(this, Ball);

	    this.context = settings.context;
	    this.effects = new _Effects2["default"]();
	    var color = settings.color || this.randomizeColor();
	    var radius = settings.radius || 20;
	    this.state = {
	      direction: {
	        x: 7,
	        y: 7
	      },
	      position: {
	        x: 0,
	        y: 0
	      },
	      apperance: {
	        color: color,
	        radius: radius
	      }
	    };
	  }

	  _createClass(Ball, [{
	    key: "setColor",
	    value: function setColor(color) {
	      var lastColor = this.state.apperance.color;
	      this.state.apperance.color = color || this.effects.randomizeColor();
	      return lastColor;
	    }
	  }, {
	    key: "setRadius",
	    value: function setRadius(radius) {
	      this.state.apperance.radius = radius;
	    }
	  }, {
	    key: "setDirection",
	    value: function setDirection(direction) {
	      if (direction.x !== undefined) this.state.direction.x = direction.x;
	      if (direction.y !== undefined) this.state.direction.y = direction.y;
	    }
	  }, {
	    key: "setSpeed",
	    value: function setSpeed(value) {
	      var direction = {
	        x: this.state.direction.x > 0 ? value : -value,
	        y: this.state.direction.y > 0 ? value : -value
	      };
	      this.setDirection(direction);
	    }
	  }, {
	    key: "speedUp",
	    value: function speedUp(speed) {
	      this.state.direction.x *= speed;
	      this.state.direction.y *= speed;
	    }
	  }, {
	    key: "setPosition",
	    value: function setPosition(position) {
	      if (position.x !== undefined) this.state.position.x = position.x;
	      if (position.y !== undefined) this.state.position.y = position.y;
	    }
	  }, {
	    key: "reflexPosition",
	    value: function reflexPosition() {
	      this.state.position = {
	        x: this.state.position.x + this.state.direction.x,
	        y: this.state.position.y + this.state.direction.y
	      };
	    }
	  }, {
	    key: "render",
	    value: function render(start) {
	      var context = this.context;
	      context.beginPath();
	      context.arc(this.state.position.x, this.state.position.y, this.state.apperance.radius, 0, 2 * Math.PI, false);
	      context.fillStyle = this.state.apperance.color;
	      context.fill();
	    }
	  }]);

	  return Ball;
	})();

	module.exports = Ball;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Effects = (function () {
	  function Effects() {
	    _classCallCheck(this, Effects);
	  }

	  _createClass(Effects, [{
	    key: "fadeInText",
	    value: function fadeInText(settings) {
	      var context = settings.context;
	      var render = function render() {
	        context.fillStyle = typeof settings.color == "function" ? settings.color() : settings.color;
	        context.font = settings.font;
	        context.fillText(settings.text, settings.position.x, settings.position.y);
	      };
	      render();
	    }
	  }, {
	    key: "randomizeColor",
	    value: function randomizeColor() {
	      var r = ~ ~(Math.random() * 255);
	      var g = ~ ~(Math.random() * 255);
	      var b = ~ ~(Math.random() * 255);
	      var a = Math.random() * 50 / 10;
	      return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
	    }
	  }]);

	  return Effects;
	})();

	module.exports = Effects;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Effects = __webpack_require__(3);

	var _Effects2 = _interopRequireDefault(_Effects);

	var Bar = (function () {
	  function Bar(settings) {
	    _classCallCheck(this, Bar);

	    this.context = settings.context;
	    this.effects = new _Effects2["default"]();
	    this.playGround = settings.playGround;
	    this.state = {
	      position: {
	        x: settings.x || 0,
	        y: settings.y || 0
	      },
	      apperance: {
	        width: settings.width,
	        height: settings.height,
	        color: settings.color
	      }
	    };
	    this.bindMoveEvent();
	  }

	  _createClass(Bar, [{
	    key: "bindMoveEvent",
	    value: function bindMoveEvent() {
	      window.addEventListener("mousemove", (function (event) {
	        var position = event.clientX - this.state.apperance.width / 2;
	        //console.log(this.playGround.offset.left, position);
	        if (position < this.playGround.offset.left) position = this.playGround.offset.left;
	        if (position + this.state.apperance.width > this.playGround.width - this.playGround.offset.right) position = this.playGround.width - this.playGround.offset.right - this.state.apperance.width;
	        this.setPosition({ x: position });
	      }).bind(this));
	      window.addEventListener("touchmove", (function (event) {
	        this.setPosition({ x: event.clientX - this.state.apperance.width / 2 });
	      }).bind(this));
	    }
	  }, {
	    key: "setColor",
	    value: function setColor(color) {
	      var lastColor = this.state.apperance.color;
	      this.state.apperance.color = color || this.effects.randomizeColor();
	      return lastColor;
	    }
	  }, {
	    key: "setPosition",
	    value: function setPosition(position) {
	      if (position.x) this.state.position.x = position.x;
	      if (position.y) this.state.position.y = position.y;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var context = this.context;
	      context.fillStyle = this.state.apperance.color;
	      context.fillRect(this.state.position.x, this.state.position.y, this.state.apperance.width, this.state.apperance.height);
	    }
	  }]);

	  return Bar;
	})();

	module.exports = Bar;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _Level = __webpack_require__(6);

	var _Level2 = _interopRequireDefault(_Level);

	var Levels = [];
	var settings = {
	  bonusses: [{
	    name: "doubleBall",
	    activationPoints: [30],
	    activationHits: [30]
	  }],
	  levelCompleted: function levelCompleted(gameState) {
	    return gameState.points > 60;
	  }
	};
	var level = new _Level2["default"](settings);
	Levels.push(level);

	module.exports = Levels;

	/*
	TODO
	  add to gameState if ball hit borders or not. Hits in object will be detected in objects build in methods depending on ball position.
	  bonus doesnt work after reset
	*/

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Bonusses = __webpack_require__(7);

	var _Bonusses2 = _interopRequireDefault(_Bonusses);

	var Level = (function () {
	  function Level(settings) {
	    _classCallCheck(this, Level);

	    this.bonusses = this.setBonusses(settings.bonusses);
	    /* bonusses = { // default bonuses match to level, any other bonuses will be conected to level-objects like rect to hit;
	      name : NAME FROM CLASS bonusses
	      duration: [],
	      activationTime :[],
	      activationPoints : []
	      acivationPosition : {
	        x : {
	          from : 0,
	          to : 0,
	       }.
	       y : {
	        from : 0,
	        to : 0,
	      }
	     }
	     activationHits : []
	    }
	    */
	    this.levelCompleted = settings.levelCompleted;
	  }

	  _createClass(Level, [{
	    key: "setBonusses",
	    value: function setBonusses(bonusses) {
	      var bonussesList = new _Bonusses2["default"]();
	      bonusses.forEach(function (bonus) {
	        bonus.object = bonussesList[bonus.name]();
	        console.log(bonus.object);
	      });
	      return bonusses;
	    }
	  }, {
	    key: "activateBonusses",
	    value: function activateBonusses(gameState) {
	      this.bonusses.forEach(function (bonus) {
	        if (!bonus.object.active && (bonus.activationPoints.includes(gameState.points) || bonus.activationHits.includes(gameState.hits))) {
	          (function () {
	            console.log("activation", bonus.activationPoints.includes(gameState.points), bonus.activationHits.includes(gameState.hits));
	            var permitted = {};
	            bonus.object.permissions.forEach(function (permission) {
	              permitted[permission] = gameState[permission];
	            });
	            bonus.object.activate(permitted);
	          })();
	        }
	      });
	    }
	  }, {
	    key: "render",
	    value: function render(gameState) {
	      this.activateBonusses(gameState);
	      this.bonusses.forEach(function (bonus) {
	        if (bonus.object.active) bonus.object.render();
	      });
	    }
	  }]);

	  return Level;
	})();

	module.exports = Level;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Bonus = __webpack_require__(8);

	var _Bonus2 = _interopRequireDefault(_Bonus);

	var _Ball = __webpack_require__(2);

	var _Ball2 = _interopRequireDefault(_Ball);

	var Bonusses = (function () {
	  function Bonusses() {
	    _classCallCheck(this, Bonusses);
	  }

	  _createClass(Bonusses, [{
	    key: "doubleBall",
	    value: function doubleBall() {
	      return new _Bonus2["default"](["balls", "playGround"], function (permitted) {
	        permitted.balls.push(new _Ball2["default"]({ context: permitted.playGround, color: "black", radius: 30 }));
	      }, function (permitted) {
	        permitted.balls.pop();
	      }, function (permitted) {
	        console.log(":)", permitted);
	      });
	    }
	  }]);

	  return Bonusses;
	})();

	module.exports = Bonusses;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bonus = (function () {
	  function Bonus(permissions, onActive, onDisactive, render) {
	    _classCallCheck(this, Bonus);

	    this.permissions = permissions;
	    this.active = false;
	    this.render = render.bind(this, this.permitted);
	    this.onActive = onActive;
	    this.onDisactive = onDisactive;
	    this.permitted = {};
	  }

	  _createClass(Bonus, [{
	    key: "activate",
	    value: function activate(permitted) {
	      this.active = true;
	      this.permitted = permitted;
	      this.onActive(this.permitted);
	    }
	  }, {
	    key: "deactivate",
	    value: function deactivate() {
	      this.active = false;
	      this.onDisactive(this.permitted);
	      this.permitted = {};
	    }
	  }]);

	  return Bonus;
	})();

	module.exports = Bonus;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, ".canvas {\r\n  width:100%;\r\n  height:100%;\r\n  position:fixed;\r\n  top:0px;\r\n  left:0px;\r\n}\r\n.speedBar {\r\n  position: fixed;\r\n  top: 10px;\r\n  left: 10px;\r\n  z-index:2;\r\n}\r\n.restartBtn {\r\n  position:fixed;\r\n  top:10px;\r\n  right:10px;\r\n  width:100px;\r\n  height:50px;\r\n  background-color: red;\r\n}\r\n.pointsDisplay {\r\n  position:fixed;\r\n  top:-10px;\r\n  right:120px;\r\n  width:100px;\r\n  height:50px;\r\n  background-color: red;\r\n  text-align: center;\r\n  line-height: 50px;\r\n  font-size: 20px;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./normalize.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./normalize.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n", ""]);

	// exports


/***/ }
/******/ ]);
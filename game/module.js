webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _game = __webpack_require__(1);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	    new _game2.default();
	})(); //import Game from "./js/app";

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _resources = __webpack_require__(2);

	var _resources2 = _interopRequireDefault(_resources);

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	var _Controls = __webpack_require__(4);

	var _Controls2 = _interopRequireDefault(_Controls);

	var _Player = __webpack_require__(6);

	var _Player2 = _interopRequireDefault(_Player);

	var _Enemy = __webpack_require__(7);

	var _Enemy2 = _interopRequireDefault(_Enemy);

	var _Collisions = __webpack_require__(8);

	var _Collisions2 = _interopRequireDefault(_Collisions);

	var _paralaxBackGround = __webpack_require__(12);

	var _paralaxBackGround2 = _interopRequireDefault(_paralaxBackGround);

	var _Star = __webpack_require__(13);

	var _Star2 = _interopRequireDefault(_Star);

	var _Objects = __webpack_require__(14);

	var _Objects2 = _interopRequireDefault(_Objects);

	var _Weapon = __webpack_require__(15);

	var _Weapon2 = _interopRequireDefault(_Weapon);

	var _Powerup = __webpack_require__(11);

	var _Powerup2 = _interopRequireDefault(_Powerup);

	var _Powerups = __webpack_require__(16);

	var _Powerups2 = _interopRequireDefault(_Powerups);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(17);
	var terrainUrl = __webpack_require__(23);
	var spritesUrl = __webpack_require__(24);
	var starsUrl = __webpack_require__(25);
	var musicUrl = __webpack_require__(26);

	/* TODO
	* colectiong  wapons 'n powerups, activation and disactivation, powerups mechanism improvement
	* NEED a powerups array wraper with methods like isAnyActive ( to activate collected one by default) contains collectd powerup (to increase duration time);
	* energy bar
	* bomb object - when shot - explode and destory enemy;
	* energy position
	* some new weapons
	* LSD mode
	* slowmotion
	* self- defence
	* defence bar

	*/
	var Game = function () {
	    function Game() {
	        _classCallCheck(this, Game);

	        this.state = {
	            player: {},
	            bullets: [],
	            enemies: [],
	            isGameOver: false,
	            score: 0,
	            gameTime: 0,
	            lastFire: 0,
	            dt: 0,
	            lastTime: 0
	        };
	        this.modules = {
	            ctx: {},
	            canvas: {},
	            spritesUrl: spritesUrl,
	            terrainUrl: terrainUrl,
	            starsUrl: starsUrl,
	            scoreEl: document.getElementById('score')
	        };
	        this.modules.internals = this.getInternals();
	        var UI = this.createUI();
	        this.modules.canvas = UI.canvas;
	        this.modules.ctx = UI.ctx;
	        this.modules.objects = _Objects2.default;
	        this.modules.FPS = UI.FPS;
	        this.modules.TIME = UI.TIME;
	        this.modules.AUDIO = UI.AUDIO;

	        console.log(UI);
	        this.modules.controls = new _Controls2.default(this.modules.internals, UI.buttons);
	        this.modules.collisions = new _Collisions2.default(this.modules.internals);
	        this.modules.gameOver = this.gameOver.bind(this);
	        this.modules.resources = _resources2.default;
	        this.modules.resources.load([spritesUrl, terrainUrl, starsUrl]);
	        this.modules.resources.onReady(this.init.bind(this));
	    }

	    _createClass(Game, [{
	        key: "createUI",
	        value: function createUI() {
	            var canvas = document.createElement("canvas");
	            var ctx = canvas.getContext("2d");
	            canvas.width = 854;
	            canvas.height = canvas.width / window.innerWidth * window.innerHeight;

	            document.body.appendChild(canvas);
	            var UP = document.createElement("div");
	            UP.innerHTML = "&#x02191";
	            UP.classList.add("UP");
	            document.body.appendChild(UP);

	            var DOWN = document.createElement("div");
	            DOWN.innerHTML = "&#x02193";
	            DOWN.classList.add("DOWN");
	            document.body.appendChild(DOWN);

	            var LEFT = document.createElement("div");
	            LEFT.innerHTML = "&#x02190";
	            LEFT.classList.add("LEFT");
	            document.body.appendChild(LEFT);

	            var RIGHT = document.createElement("div");
	            RIGHT.innerHTML = "&#x02192";
	            RIGHT.classList.add("RIGHT");

	            document.body.appendChild(RIGHT);

	            var FIRE = document.createElement("div");
	            FIRE.innerHTML = "Fire!!";
	            FIRE.classList.add("FIRE");
	            document.body.appendChild(FIRE);

	            var FPS = document.createElement("span");
	            FPS.classList.add("FPS");
	            document.body.appendChild(FPS);

	            var TIME = document.createElement("span");
	            TIME.classList.add("TIME");
	            document.body.appendChild(TIME);

	            TIME.addEventListener("click", this.tooglePause.bind(this));

	            var SETFPS = document.createElement("input");
	            SETFPS.setAttribute("type", "range");
	            SETFPS.setAttribute("min", "1");
	            SETFPS.setAttribute("max", "120");
	            SETFPS.setAttribute("step", "1");
	            SETFPS.setAttribute("value", "60");

	            SETFPS.classList.add("SETFPS");
	            document.body.appendChild(SETFPS);
	            SETFPS.addEventListener("change", function (e) {
	                this.state.FPS = e.target.value;
	            }.bind(this));

	            var AUDIO = document.createElement("audio");
	            AUDIO.setAttribute("src", musicUrl);
	            AUDIO.setAttribute("loop", "");

	            document.body.appendChild(AUDIO);

	            return { buttons: { UP: UP, DOWN: DOWN, LEFT: LEFT, RIGHT: RIGHT, FIRE: FIRE }, canvas: canvas, ctx: ctx, FPS: FPS, TIME: TIME, AUDIO: AUDIO };
	        }
	    }, {
	        key: "init",
	        value: function init() {

	            document.getElementById('play-again').addEventListener('click', function () {
	                this.reset();
	            }.bind(this));

	            this.reset();
	            this.state.lastTime = Date.now();
	            this.modules.AUDIO.play();
	            this.loop();
	        }
	    }, {
	        key: "loop",
	        value: function loop() {
	            var now = Date.now();
	            this.state.dt = (now - this.state.lastTime) / 1000.0;

	            this.update();
	            this.render();
	            //alert("this working");
	            this.state.lastTime = now;
	            if (!this.state.stop) window.setTimeout(this.loop.bind(this), 1000 / this.state.FPS);
	            //window.requestAnimationFrame(this.loop.bind(this));
	        }
	    }, {
	        key: "gameOver",
	        value: function gameOver() {
	            document.getElementById('game-over').style.display = 'block';
	            document.getElementById('game-over-overlay').style.display = 'block';
	            this.state.isGameOver = true;
	        }
	    }, {
	        key: "getInternals",
	        value: function getInternals() {
	            return {
	                state: this.state,
	                modules: this.modules
	            };
	        }
	    }, {
	        key: "tooglePause",
	        value: function tooglePause() {
	            this.state.stop = !this.state.stop;
	            if (!this.state.stop) {
	                this.state.lastTime = Date.now();
	                this.loop();
	                this.modules.AUDIO.play();
	            } else this.modules.AUDIO.pause();
	        }
	    }, {
	        key: "updateObjects",
	        value: function updateObjects() {
	            this.state.player.update();
	            /* update moved to delete loop - 2x less loops
	            this.state.enemies.forEach((enemy)=>{
	                enemy.update();
	            })
	            this.state.bullets.forEach((bullet)=>{
	                bullet.update();
	            })
	            this.state.explosions.forEach((explosion)=>{
	                explosion.update();
	            })
	            this.modules.stars.forEach((stars) => {
	                stars.update();
	            });
	            this.state.gifts.forEach((gift)=>{
	                gift.update();
	            });
	            this.state.powerups.forEach((powerup) => {
	                powerup.update();
	            })
	            */
	            /* Remove objects whitch are out of bounds */
	            var canvas = this.modules.canvas;

	            var enemies = this.state.enemies;
	            var bullets = this.state.bullets;
	            var explosions = this.state.explosions;
	            var stars = this.modules.stars;
	            var gifts = this.state.gifts;
	            var pows = this.state.powerups;

	            for (var i = 0; i < enemies.length;) {
	                enemies[i].update();
	                if (enemies[i].state.pos[0] + enemies[i].modules.sprite.size[0] < 0) {
	                    enemies.splice(i, 1);
	                    console.log("removing enemy");
	                } else {
	                    i++;
	                }
	            }
	            for (var _i = 0; _i < bullets.length;) {
	                var bullet = bullets[_i];
	                bullet.update();
	                if (bullet.state.pos[1] < 0 || bullet.state.pos[1] > canvas.height || bullet.state.pos[0] > canvas.width) {
	                    bullets.splice(_i, 1);
	                    console.log("removing bullet");
	                } else {
	                    _i++;
	                }
	            }
	            for (var _i2 = 0; _i2 < explosions.length;) {
	                explosions[_i2].update();
	                if (explosions[_i2].modules.sprite.done) {
	                    explosions.splice(_i2, 1);
	                    console.log("removing explosion");
	                } else {
	                    _i2++;
	                }
	            }
	            this.modules.stars.forEach(function (stars) {
	                stars.update();
	            });
	            /* do not delete start. move them to right - executed in star.update();
	            for(let i = 0; i < stars.length;) {
	                if (stars[i].state.isDone) {
	                    stars.splice(i,1);
	                }
	                else {
	                    i++;
	                }
	            }*/
	            for (var _i3 = 0; _i3 < gifts.length;) {
	                gifts[_i3].update();
	                if (gifts[_i3].state.expirationTime < this.state.gameTime) {
	                    gifts.splice(_i3, 1);
	                } else {
	                    _i3++;
	                }
	            }
	            pows.update();
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            //const start = Date.now();
	            var dt = this.state.dt;
	            this.state.gameTime += dt;
	            this.modules.FPS.innerHTML = "FPS: " + ~~(1 / dt);
	            this.modules.TIME.innerHTML = "TIME: " + ~~this.state.gameTime;

	            this.modules.controls.handleKeysPress();

	            //console.log(this.modules.stars.length);
	            /* Check weapon
	            if (this.state.weapon.expirationTime < this.state.gameTime)
	                this.state.weapon.restoreDefault();
	                */
	            this.updateObjects();

	            // It gets harder over time by adding enemies using this
	            // equation: 1-.993^gameTime
	            /* do not add start, move them
	            if (Date.now() % 6 ==0)
	                  this.modules.stars.push(new Star(this.modules.internals));*/
	            if (Math.random() < 1 - Math.pow(.999, this.state.gameTime)) {
	                if (Math.random() < 0.3) this.state.enemies.push(this.modules.objects.enemies.johnHardson(this.modules.internals));else this.state.enemies.push(this.modules.objects.enemies.regular(this.modules.internals));
	            }

	            this.modules.collisions.check();

	            this.modules.scoreEl.innerHTML = this.state.score;
	            //console.log("updating time: " + (Date.now() -start));
	        }
	    }, {
	        key: "renderObjects",
	        value: function renderObjects() {
	            this.modules.stars.forEach(function (stars) {
	                stars.render();
	            });
	            if (!this.state.isGameOver) {
	                this.state.player.render();
	            }
	            this.state.enemies.forEach(function (enemy) {
	                enemy.render();
	            });
	            this.state.bullets.forEach(function (bullet) {
	                bullet.render();
	            });
	            this.state.explosions.forEach(function (explosion) {
	                explosion.render();
	            });
	            this.state.gifts.forEach(function (gift) {
	                gift.render();
	            });

	            this.state.powerups.render();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            //const start = Date.now();
	            this.modules.ctx.clearRect(0, 0, this.modules.canvas.width, this.modules.canvas.height);
	            this.renderObjects();
	            //console.log("rendering time: " + (Date.now() -start));
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            this.modules.controls.hideControls(true);
	            window.setTimeout(this.modules.controls.hideControls.bind(this.modules.controls), 3000);
	            document.getElementById('game-over').style.display = 'none';
	            document.getElementById('game-over-overlay').style.display = 'none';
	            document.body.classList.remove("lsd");
	            this.state.FPS = 60;
	            this.state.isGameOver = false;
	            this.state.gameTime = 0;
	            this.state.score = 0;
	            this.state.scoreMultiply = 1;
	            this.state.weapon = new _Weapon2.default();
	            this.state.enemies = [];
	            this.state.bullets = [];
	            this.state.explosions = [];
	            /* Powerup class as a wrapper to powerups, methods render update etc  + activate, deactivate;*/
	            //let pow;
	            this.state.powerups = new _Powerups2.default(this.modules.internal);
	            //this.state.powerups.push((pow = new Powerup(this.modules.internals, "bullets", "torpedo_forward", 50)));
	            //pow.activate();
	            //this.state.powerups.push((pow = new Powerup(this.modules.internals, "bullets", "plasma_forward", 50)));
	            //pow.activate();
	            this.state.gifts = [];
	            this.modules.stars = [];
	            /* Add some start to BG */
	            var i = 0;
	            while (i++ < this.modules.canvas.width) {
	                if (i % 6 == 0) this.modules.stars.push(new _Star2.default(this.modules.internals, i));
	            }
	            this.state.player = new _Player2.default(this.modules.internals);
	            this.state.player.state.pos = [50, this.modules.canvas.height / 2];
	        }
	    }]);

	    return Game;
	}();

	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Resources = function () {
	    function Resources() {
	        _classCallCheck(this, Resources);

	        this.resourceCache = {};
	        this.loading = [];
	        this.readyCallbacks = [];
	    }
	    // Load an image url or an array of image urls


	    _createClass(Resources, [{
	        key: "load",
	        value: function load(urlOrArr) {
	            var self = this;
	            if (urlOrArr instanceof Array) {
	                urlOrArr.forEach(function (url) {
	                    self._load(url);
	                });
	            } else {
	                this._load(urlOrArr);
	            }
	        }
	    }, {
	        key: "_load",
	        value: function _load(url) {
	            var _this = this;

	            console.log(this);
	            if (this.resourceCache[url]) {
	                return this.resourceCache[url];
	            } else {
	                (function () {
	                    var img = new Image();
	                    img.onload = function () {
	                        this.resourceCache[url] = img;

	                        if (this.isReady()) {
	                            this.readyCallbacks.forEach(function (func) {
	                                func();
	                            });
	                        }
	                    }.bind(_this);
	                    _this.resourceCache[url] = false;
	                    img.src = url;
	                })();
	            }
	        }
	    }, {
	        key: "get",
	        value: function get(url) {
	            return this.resourceCache[url];
	        }
	    }, {
	        key: "isReady",
	        value: function isReady() {
	            var ready = true;
	            for (var k in this.resourceCache) {
	                if (this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]) {
	                    ready = false;
	                }
	            }
	            return ready;
	        }
	    }, {
	        key: "onReady",
	        value: function onReady(func) {
	            this.readyCallbacks.push(func);
	        }
	    }]);

	    return Resources;
	}();

	exports.default = new Resources();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _resources = __webpack_require__(2);

	var _resources2 = _interopRequireDefault(_resources);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sprite = function () {
	    function Sprite(url, pos, size, speed, frames, dir, once) {
	        _classCallCheck(this, Sprite);

	        this.pos = pos;
	        this.size = size;
	        this.speed = typeof speed === 'number' ? speed : 0;
	        this.frames = frames;
	        this._index = 0;
	        this.url = url;
	        this.dir = dir || 'horizontal';
	        this.once = once;
	    }

	    _createClass(Sprite, [{
	        key: 'update',
	        value: function update(dt) {

	            this._index += this.speed * dt;
	        }
	    }, {
	        key: 'render',
	        value: function render(ctx) {
	            var frame = void 0;

	            if (this.speed > 0) {
	                var max = this.frames.length;
	                var idx = Math.floor(this._index);
	                frame = this.frames[idx % max];

	                if (this.once && idx >= max) {
	                    this.done = true;
	                    return;
	                }
	            } else {
	                frame = 0;
	            }
	            var x = this.pos[0];
	            var y = this.pos[1];

	            if (this.dir == 'vertical') {
	                y += frame * this.size[1];
	            } else {
	                x += frame * this.size[0];
	            }

	            ctx.drawImage(_resources2.default.get(this.url), x, y, this.size[0], this.size[1], 0, 0, this.size[0], this.size[1]);
	        }
	    }]);

	    return Sprite;
	}();

	exports.default = Sprite;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	var _Bullet = __webpack_require__(5);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controls = function () {
	    function Controls(externals, buttons) {
	        _classCallCheck(this, Controls);

	        this.externals = externals;
	        console.log("externals", this.externals);

	        this.state = this.reset();
	        this.modules = _extends({}, buttons);
	        console.log(this.modules);
	        this.bindControls();
	    }

	    _createClass(Controls, [{
	        key: "hideControls",
	        value: function hideControls(reset) {
	            if (!reset) {
	                this.modules.UP.classList.add("hide");
	                this.modules.DOWN.classList.add("hide");
	                this.modules.LEFT.classList.add("hide");
	                this.modules.RIGHT.classList.add("hide");
	                this.modules.FIRE.classList.add("hide");

	                this.modules.UP.innerHTML = "";
	                this.modules.DOWN.innerHTML = "";
	                this.modules.LEFT.innerHTML = "";
	                this.modules.RIGHT.innerHTML = "";
	                this.modules.FIRE.innerHTML = "";
	            } else {
	                this.modules.UP.classList.remove("hide");
	                this.modules.DOWN.classList.remove("hide");
	                this.modules.LEFT.classList.remove("hide");
	                this.modules.RIGHT.classList.remove("hide");
	                this.modules.FIRE.classList.remove("hide");

	                this.modules.UP.innerHTML = "&#x02191";
	                this.modules.DOWN.innerHTML = "&#x02193";
	                this.modules.LEFT.innerHTML = "&#x02190";
	                this.modules.RIGHT.innerHTML = "&#x02192";
	                this.modules.FIRE.innerHTML = "Fire!!";
	            }
	        }
	    }, {
	        key: "bindControls",
	        value: function bindControls() {
	            var _this = this;

	            /*
	            this.modules.UP.addEventListener("mousedown", this.tooglePress.bind(this, "UP"));
	            this.modules.UP.addEventListener("mouseup", this.tooglePress.bind(this, "UP"));
	              this.modules.DOWN.addEventListener("mousedown", this.tooglePress.bind(this, "DOWN"));
	            this.modules.DOWN.addEventListener("mouseup", this.tooglePress.bind(this, "DOWN"));
	              this.modules.RIGHT.addEventListener("mousedown", this.tooglePress.bind(this, "RIGHT"));
	            this.modules.RIGHT.addEventListener("mouseup", this.tooglePress.bind(this, "RIGHT"));
	              this.modules.LEFT.addEventListener("mousedown", this.tooglePress.bind(this, "LEFT"));
	            this.modules.LEFT.addEventListener("mouseup", this.tooglePress.bind(this, "LEFT"));
	              this.modules.FIRE.addEventListener("mousedown", this.tooglePress.bind(this, "FIRE"));
	            this.modules.FIRE.addEventListener("mouseup", this.tooglePress.bind(this, "FIRE"));
	              window.addEventListener("mousedown", this.tooglePress.bind(this, "WINDOW"));
	            window.addEventListener("mouseup", this.untoogleAll.bind(this));
	            */
	            if (window.innerWidth < 1024) {
	                this.modules.UP.addEventListener("touchstart", this.tooglePress.bind(this, "UP"));
	                this.modules.UP.addEventListener("touchend", this.tooglePress.bind(this, "UP"));

	                this.modules.DOWN.addEventListener("touchstart", this.tooglePress.bind(this, "DOWN"));
	                this.modules.DOWN.addEventListener("touchend", this.tooglePress.bind(this, "DOWN"));

	                this.modules.RIGHT.addEventListener("touchstart", this.tooglePress.bind(this, "RIGHT"));
	                this.modules.RIGHT.addEventListener("touchend", this.tooglePress.bind(this, "RIGHT"));

	                this.modules.LEFT.addEventListener("touchstart", this.tooglePress.bind(this, "LEFT"));
	                this.modules.LEFT.addEventListener("touchend", this.tooglePress.bind(this, "LEFT"));

	                this.modules.FIRE.addEventListener("touchstart", this.tooglePress.bind(this, "FIRE"));
	                this.modules.FIRE.addEventListener("touchend", this.tooglePress.bind(this, "FIRE"));

	                window.addEventListener("touchstart", this.tooglePress.bind(this, "WINDOW"));
	                window.addEventListener("touchend", this.untoogleAll.bind(this));
	            } else {
	                var bind = function bind(pressDown, event) {
	                    //alert(ev.code);
	                    switch (event.code) {
	                        case "Space":
	                            if (this.state.FIRE != pressDown) this.tooglePress("FIRE");break;
	                        case "ArrowUp":
	                            if (this.state.UP != pressDown) this.tooglePress("UP");break;
	                        case "ArrowDown":
	                            if (this.state.DOWN != pressDown) this.tooglePress("DOWN");break;
	                        case "ArrowLeft":
	                            if (this.state.LEFT != pressDown) this.tooglePress("LEFT");break;
	                        case "ArrowRight":
	                            if (this.state.RIGHT != pressDown) this.tooglePress("RIGHT");break;
	                    }
	                };
	                window.addEventListener("keydown", bind.bind(this, true));
	                window.addEventListener("keyup", bind.bind(this, false));
	                Object.keys(this.modules).forEach(function (key, index) {
	                    _this.modules[key].classList.add("disappear");
	                });
	            }
	        }
	    }, {
	        key: "handleUP",
	        value: function handleUP() {
	            //console.log("handleAction");
	            this.externals.state.player.state.pos[1] -= this.externals.state.player.state.speed * this.externals.state.dt;
	        }
	    }, {
	        key: "handleDOWN",
	        value: function handleDOWN() {
	            //console.log("handleAction");
	            this.externals.state.player.state.pos[1] += this.externals.state.player.state.speed * this.externals.state.dt;
	        }
	    }, {
	        key: "handleRIGHT",
	        value: function handleRIGHT() {

	            //console.log("handleAction");
	            this.externals.state.player.state.pos[0] += this.externals.state.player.state.speed * this.externals.state.dt;
	        }
	    }, {
	        key: "handleLEFT",
	        value: function handleLEFT() {
	            //console.log("handleAction");
	            this.externals.state.player.state.pos[0] -= this.externals.state.player.state.speed * this.externals.state.dt;
	        }
	    }, {
	        key: "handleFIRE",
	        value: function handleFIRE() {
	            //console.log("handleAction");
	            //console.log(this.externals);
	            if (!this.externals.state.isGameOver && Date.now() - this.externals.state.lastFire > this.externals.state.weapon.deltaLimit) {
	                var x = this.externals.state.player.state.pos[0] + this.externals.state.player.modules.sprite.size[0] - 5;
	                var y = this.externals.state.player.state.pos[1] + this.externals.state.player.modules.sprite.size[1] / 2 - 3;
	                var weaponType = this.externals.state.weapon.current;
	                this.externals.state.bullets.push(this.externals.modules.objects.bullets[weaponType](this.externals, [x, y]));
	                /*
	                this.externals.state.bullets.push(new Bullet(
	                    this.externals,
	                    [x, y],
	                    'up',
	                    new Sprite(this.externals.modules.spritesUrl, [0, 50], [9, 5])
	                ));
	                this.externals.state.bullets.push(new Bullet(
	                    this.externals,
	                    [x, y],
	                    'down',
	                    new Sprite(this.externals.modules.spritesUrl, [0, 60], [9, 5])
	                ));
	                */
	                this.externals.state.lastFire = Date.now();
	            }
	        }
	    }, {
	        key: "handleKeysPress",
	        value: function handleKeysPress() {
	            if (this.state.UP) this.handleUP();
	            if (this.state.DOWN) this.handleDOWN();
	            if (this.state.LEFT) this.handleLEFT();
	            if (this.state.RIGHT) this.handleRIGHT();
	            if (this.state.FIRE) this.handleFIRE();
	        }
	    }, {
	        key: "tooglePress",
	        value: function tooglePress(key, event) {
	            var _this2 = this;

	            //console.log("event", event);
	            console.log("key", key);
	            if (key !== "WINDOW" || event.target === this.externals.modules.canvas) {
	                (function () {
	                    _this2.state[key] = key !== "WINDOW" ? !_this2.state[key] : true;
	                    var speed = key == "LEFT" ? -10 : 40; //left arrow - slow down by 10, right spped up by 40;
	                    if (key === "LEFT" || key === "RIGHT") {
	                        if (_this2.state[key]) _this2.externals.modules.stars.forEach(function (star) {
	                            star.changeSpeed(speed);
	                        });else _this2.externals.modules.stars.forEach(function (star) {
	                            star.restoreSpeed();
	                        });
	                    }
	                    console.log("changing");
	                })();
	            }
	        }
	    }, {
	        key: "untoogleAll",
	        value: function untoogleAll(event) {
	            console.log(event.target);
	            if (event.target == this.externals.modules.canvas && !this.state.WINDOW) {
	                this.state = this.reset();
	                console.log("untoogleAll");
	            }
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            return {
	                UP: false,
	                DOWN: false,
	                RIGHT: false,
	                LEFT: false,
	                FIRE: false,
	                WINDOW: false
	            };
	        }
	    }]);

	    return Controls;
	}();

	exports.default = Controls;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bullet = function () {
	    function Bullet(externals, pos, dir, power, speed, sprite) {
	        _classCallCheck(this, Bullet);

	        this.externals = externals; //like player, game state, etc.
	        this.state = {};
	        this.modules = {};
	        this.state.pos = pos;
	        this.state.dir = dir;
	        this.state.speed = speed || 500;
	        this.state.power = power || 1;
	        this.modules.sprite = sprite;
	    }

	    _createClass(Bullet, [{
	        key: 'getInternals',
	        value: function getInternals() {
	            return {
	                state: this.state,
	                modules: this.modules
	            };
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var dt = this.externals.state.dt;
	            switch (this.state.dir) {
	                case 'up':
	                    this.state.pos[1] -= this.state.speed * dt;break;
	                case 'down':
	                    this.state.pos[1] += this.state.speed * dt;break;
	                default:
	                    this.state.pos[0] += this.state.speed * dt;
	            }
	            this.modules.sprite.update(dt);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var ctx = this.externals.modules.ctx;
	            ctx.save();
	            ctx.translate(this.state.pos[0], this.state.pos[1]);
	            this.modules.sprite.render(ctx);
	            ctx.restore();
	        }
	    }]);

	    return Bullet;
	}();

	exports.default = Bullet;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
	    function Player(externals) {
	        _classCallCheck(this, Player);

	        this.externals = externals;
	        this.state = {};
	        this.modules = {};
	        this.state.pos = [0, 0], this.state.speed = 200;
	        this.state.defence = false;
	        this.modules.sprite = new _sprite2.default(this.externals.modules.spritesUrl, [5, 160], [70, 60], 16, [0, 1, 2, 3, 4, 3, 2, 1]);
	        this.modules.defence = new _sprite2.default(this.externals.modules.spritesUrl, [0, 500], [130, 100], 14, [0, 1, 2, 1]);
	    }

	    _createClass(Player, [{
	        key: "checkBounds",
	        value: function checkBounds() {
	            // Check bounds
	            var pos = this.state.pos;
	            var sprite = this.modules.sprite;
	            var canvas = this.externals.modules.canvas;

	            if (pos[0] < 0) {
	                pos[0] = 0;
	            } else if (pos[0] > canvas.width - sprite.size[0]) {
	                pos[0] = canvas.width - sprite.size[0];
	            }

	            if (pos[1] < 0) {
	                pos[1] = 0;
	            } else if (pos[1] > canvas.height - sprite.size[1]) {
	                pos[1] = canvas.height - sprite.size[1];
	            }
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            this.modules.sprite.update(this.externals.state.dt);
	            if (this.state.defence) this.modules.defence.update(this.externals.state.dt);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var ctx = this.externals.modules.ctx;
	            ctx.save();
	            ctx.translate(this.state.pos[0], this.state.pos[1]);
	            this.modules.sprite.render(ctx);
	            if (this.state.defence) {
	                ctx.globalCompositeOperation = "destination-over";
	                var defX = (this.modules.sprite.size[0] - this.modules.defence.size[0]) / 2;
	                var defY = (this.modules.sprite.size[1] - this.modules.defence.size[1]) / 2;
	                ctx.translate(defX, defY);
	                this.modules.defence.render(ctx);
	            }
	            ctx.restore();
	        }
	    }]);

	    return Player;
	}();

	exports.default = Player;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Enemy = function () {
	    function Enemy(externals, speed, hp, sprite) {
	        _classCallCheck(this, Enemy);

	        this.externals = externals; //like player, game state, etc.
	        this.state = {};
	        this.modules = {};
	        this.state.speed = speed || 80;
	        this.state.pos = [this.externals.modules.canvas.width, Math.random() * (this.externals.modules.canvas.height - 39)], this.state.hp = hp || 1;
	        this.state.score = hp || 1;
	        this.modules.sprite = sprite || new _sprite2.default(this.externals.modules.spritesUrl, [0, 230], [70, 60], 6, [0, 1, 2, 3, 2, 1]);
	    }

	    _createClass(Enemy, [{
	        key: "getInternals",
	        value: function getInternals() {
	            return {
	                state: this.state,
	                modules: this.modules
	            };
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            var dt = this.externals.state.dt;
	            this.state.pos[0] -= this.state.speed * dt;
	            this.modules.sprite.update(dt);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var ctx = this.externals.modules.ctx;
	            ctx.save();
	            ctx.translate(this.state.pos[0], this.state.pos[1]);
	            this.modules.sprite.render(ctx);
	            ctx.restore();
	        }
	    }]);

	    return Enemy;
	}();

	exports.default = Enemy;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Explosion = __webpack_require__(9);

	var _Explosion2 = _interopRequireDefault(_Explosion);

	var _Gift = __webpack_require__(10);

	var _Gift2 = _interopRequireDefault(_Gift);

	var _Powerup = __webpack_require__(11);

	var _Powerup2 = _interopRequireDefault(_Powerup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Collisions = function () {
	    function Collisions(externals) {
	        _classCallCheck(this, Collisions);

	        this.externals = externals;
	    }

	    _createClass(Collisions, [{
	        key: "collides",
	        value: function collides(x, y, r, b, x2, y2, r2, b2) {
	            //x ,y ,right ,bottom
	            return !(r <= x2 || x > r2 || b <= y2 || y > b2);
	        }
	    }, {
	        key: "boxCollides",
	        value: function boxCollides(pos, size, pos2, size2) {
	            return this.collides(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
	        }
	    }, {
	        key: "check",
	        value: function check() {
	            var _this = this;

	            this.externals.state.player.checkBounds();

	            // Run collision detection for all enemies and bullets
	            var enemies = this.externals.state.enemies;
	            var bullets = this.externals.state.bullets;
	            var gifts = this.externals.state.gifts;
	            var player = this.externals.state.player;

	            var _loop = function _loop(_i) {
	                var pos = enemies[_i].state.pos;
	                var size = enemies[_i].modules.sprite.size;

	                for (var j = 0; j < bullets.length; j++) {
	                    var pos2 = bullets[j].state.pos;
	                    var size2 = bullets[j].modules.sprite.size;

	                    if (_this.boxCollides(pos, size, pos2, size2)) {
	                        //bullet hit enemy
	                        var dmg = Math.min(enemies[_i].state.hp, bullets[j].state.power);
	                        enemies[_i].state.hp -= dmg;
	                        bullets[j].state.power -= dmg;
	                        if (enemies[_i].state.hp == 0) {
	                            // Add score
	                            var score = enemies[_i].state.score;
	                            _this.externals.state.score += _this.externals.state.scoreMultiply * score;

	                            // Remove the enemy
	                            enemies.splice(_i, 1);
	                            _i--;

	                            if (_this.externals.state.gifts.length < 3 && Math.random() < 0.1 + score / 50) {
	                                (function () {
	                                    var giftsIndexesArray = [0, 1, 1, 0, 0, 2, 0, 3, 0, 1, 2, 3];
	                                    var randomI = ~~(giftsIndexesArray.length * Math.random());
	                                    window.setTimeout(function () {
	                                        console.log(randomI, giftsIndexesArray[randomI]);
	                                        var gift = this.externals.modules.objects.gifts[giftsIndexesArray[randomI]](this.externals, [pos[0] - 50, pos[1]]);
	                                        console.log(gift);
	                                        this.externals.state.gifts.push(gift);
	                                    }.bind(_this), 1000);
	                                })();
	                            }
	                        }
	                        // Add an explosion

	                        _this.externals.state.explosions.push(_this.externals.modules.objects.explosions.regular(_this.externals, pos));

	                        // Remove the bullet and stop this iteration
	                        if (bullets[j].state.power == 0) bullets.splice(j, 1);
	                        break;
	                    }
	                }

	                if (!player.state.defence && _this.boxCollides(pos, size, player.state.pos, player.modules.sprite.size)) {
	                    //i player has no defence and colides enemy
	                    _this.externals.modules.gameOver();
	                }
	                i = _i;
	            };

	            for (var i = 0; i < enemies.length; i++) {
	                _loop(i);
	            }
	            for (var _i2 = 0; _i2 < gifts.length;) {
	                var _pos = gifts[_i2].state.pos;
	                var _size = gifts[_i2].modules.sprite.size;
	                if (this.boxCollides(_pos, _size, player.state.pos, player.modules.sprite.size)) {
	                    var powerup = new _Powerup2.default(this.externals, gifts[_i2].modules.gift.type, gifts[_i2].modules.gift.name, ~~(Math.random() * 20 + 10));
	                    this.externals.state.powerups.push(powerup);
	                    if (!this.externals.state.powerups.isAnyOfTypeActive(gifts[_i2].modules.gift.type)) powerup.activate();
	                    gifts.splice(_i2, 1);
	                    this.externals.state.score += 3;
	                } else {
	                    _i2++;
	                }
	            }
	        }
	    }]);

	    return Collisions;
	}();

	exports.default = Collisions;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Explosion = function () {
	    function Explosion(externals, pos) {
	        _classCallCheck(this, Explosion);

	        this.externals = externals; //like player, game state, etc.
	        this.state = {};
	        this.modules = {};
	        this.state.pos = pos;
	        this.modules.sprite = new _sprite2.default(this.externals.modules.spritesUrl, [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true);
	    }

	    _createClass(Explosion, [{
	        key: "getInternals",
	        value: function getInternals() {
	            return {
	                state: this.state,
	                modules: this.modules
	            };
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            this.modules.sprite.update(this.externals.state.dt);
	            //console.log("Rendering explosion");
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            //console.log("Rendering explosion");
	            var ctx = this.externals.modules.ctx;
	            ctx.save();
	            ctx.translate(this.state.pos[0], this.state.pos[1]);
	            this.modules.sprite.render(ctx);
	            ctx.restore();
	        }
	    }]);

	    return Explosion;
	}();

	exports.default = Explosion;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Gift = function () {
	    function Gift(externals, type, name, expirationTime, pos, sprite) {
	        _classCallCheck(this, Gift);

	        this.externals = externals; //like player, game state, etc.
	        this.state = {};
	        this.state.pos = pos;
	        this.state.expirationTime = expirationTime;
	        this.state.scale = 1;
	        this.state.rotate = 0;
	        this.state.rotateSpeed = 10;
	        this.modules = {};
	        this.modules.sprite = sprite || new _sprite2.default(this.externals.modules.spritesUrl, [0, 350], [50, 50], 5, [0, 1]);
	        this.modules.gift = { type: type, name: name };
	    }

	    _createClass(Gift, [{
	        key: "getInternals",
	        value: function getInternals() {
	            return {
	                state: this.state,
	                modules: this.modules
	            };
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            this.modules.sprite.update(this.externals.state.dt);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var ctx = this.externals.modules.ctx;
	            ctx.save();
	            ctx.translate(this.state.pos[0], this.state.pos[1]);
	            this.modules.sprite.render(ctx);
	            ctx.restore();
	        }
	    }]);

	    return Gift;
	}();

	exports.default = Gift;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Powerup = function () {
	    function Powerup(externals, type, name, durationTime) {
	        _classCallCheck(this, Powerup);

	        this.externals = externals;
	        this.state = {
	            type: type,
	            name: name,
	            durationTime: durationTime, // its a relative time, not absolute!
	            active: false
	        };
	        this.modules = {};
	        switch (type) {
	            case "bullets":
	                {
	                    this.modules.sprite = externals.modules.objects[type][name](externals, [0, 0]).modules.sprite; // get weapon sprite, pos array does not matter this time;
	                }break;
	            case "special":
	                {
	                    if (name === "lsd") this.modules.sprite = new _sprite2.default(externals.modules.spritesUrl, [50, 30], [20, 20]);
	                }break;
	            case "defence":
	                {
	                    if (this.state.name === "regular") {
	                        this.modules.sprite = new _sprite2.default(externals.modules.spritesUrl, [71, 621], [9, 9]);
	                    }
	                }break;
	        }
	    }

	    _createClass(Powerup, [{
	        key: "activate",
	        value: function activate() {
	            switch (this.state.type) {
	                case "bullets":
	                    {
	                        this.externals.state.weapon.set(this.state.name, this.state.durationTime + this.externals.state.gameTime);
	                    };break;
	                case "special":
	                    {
	                        if (this.state.name === "lsd") {
	                            this.externals.state.scoreMultiply = 3;
	                            document.body.classList.add("lsd");
	                        }
	                    }break;
	                case "defence":
	                    {
	                        if (this.state.name === "regular") {
	                            this.externals.state.player.state.defence = true;
	                        }
	                    }break;
	            }
	            this.state.active = true;
	        }
	    }, {
	        key: "deactivate",
	        value: function deactivate() {
	            switch (this.state.type) {
	                case "bullets":
	                    {
	                        this.externals.state.weapon.restoreDefault();
	                    };break;
	                case "special":
	                    {
	                        if (this.state.name === "lsd") {
	                            document.body.classList.remove("lsd");
	                            this.externals.state.scoreMultiply = 1;
	                        }
	                    }break;
	                case "defence":
	                    {
	                        if (this.state.name === "regular") {
	                            this.externals.state.player.state.defence = false;
	                        }
	                    }break;
	            }
	            this.state.active = false;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            if (this.state.active) {
	                this.state.durationTime -= this.externals.state.dt;
	            }
	        }
	    }, {
	        key: "render",
	        value: function render(i) {
	            var ctx = this.externals.modules.ctx;
	            var sprite = this.modules.sprite;
	            var spriteW = sprite.size[0];
	            var spriteH = sprite.size[1];
	            var x = this.externals.modules.canvas.width - (200 + i * (spriteW + 70));
	            ctx.save();
	            ctx.font = "16px sans-serif";
	            ctx.fillStyle = "rgba(255,255,255,0.1)";
	            ctx.translate(x, 20);
	            ctx.save();
	            ctx.strokeStyle = "rgba(255,255,255,0.2)";
	            ctx.lineWidth = 3;
	            ctx.strokeRect(0, 0, spriteW + 50, Math.max(spriteH, 30));
	            ctx.fillStyle = this.state.active ? "rgba(0,255,0,0.1)" : "rgba(255,255,255,0.1)";
	            var rectH = void 0;
	            ctx.fillRect(2, 2, spriteW + 50 - 2, rectH = Math.max(spriteH, 30) - 2); // size - border Width;
	            ctx.translate(2, (rectH - spriteH) / 2);
	            sprite.render(ctx);
	            ctx.restore();
	            ctx.fillStyle = "#fffafa";
	            ctx.translate(spriteW + 15, 20);
	            ctx.fillText(~~this.state.durationTime, 0, 0);
	            ctx.restore();
	        }
	    }]);

	    return Powerup;
	}();

	exports.default = Powerup;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Float = function () {
	    function Float(externals, img, scale, rangeX, rangeY, reverse) {
	        _classCallCheck(this, Float);

	        this.externals = externals;
	        this.state = {
	            top: 0,
	            left: 0,
	            speed: 50
	        };
	        this.modules = {
	            img: img,
	            rangeX: rangeX,
	            rangeY: rangeY,
	            scale: scale,
	            screenW: this.externals.modules.canvas.width,
	            screenH: this.externals.modules.canvas.height,
	            direction: reverse ? -1 : 1
	        };
	    }

	    _createClass(Float, [{
	        key: 'update',
	        value: function update() {
	            var dt = this.externals.state.dt;
	            this.state.left -= this.state.speed * dt;
	            if (-this.state.left > this.modules.rangeX) this.state.left = 0;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var ctx = this.externals.modules.ctx;
	            var canvas = this.externals.modules.canvas;
	            ctx.save();
	            ctx.scale(this.modules.scale, this.modules.scale);
	            ctx.translate(this.state.left, 0);
	            ctx.fillStyle = ctx.createPattern(this.modules.img, 'repeat');
	            ctx.fillRect(0, 0, canvas.width + this.modules.rangeX, canvas.height);
	            ctx.restore();
	        }
	    }]);

	    return Float;
	}();

	exports.default = Float;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Star = function () {
	    function Star(externals, x) {
	        _classCallCheck(this, Star);

	        this.externals = externals; //like player, game state, etc.
	        var type = Math.floor(Math.random() * 3); // 0,1,2
	        this.state = {
	            color: "#fffafa",
	            _speed: [30, 40, 50][type],
	            speed: [30, 40, 50][type],
	            yRange: [30, 50, 70][type],
	            x: x || externals.modules.canvas.width + 10,
	            y: Math.random() * externals.modules.canvas.height,
	            radius: [1, 2, 2.5][type]
	        };
	        this.modules = {};
	    }

	    _createClass(Star, [{
	        key: "getInternals",
	        value: function getInternals() {
	            return {
	                state: this.state,
	                modules: this.modules
	            };
	        }
	    }, {
	        key: "changeSpeed",
	        value: function changeSpeed(speed) {
	            this.state.speed += speed;
	        }
	    }, {
	        key: "restoreSpeed",
	        value: function restoreSpeed() {
	            this.state.speed = this.state._speed;
	        }
	    }, {
	        key: "movefromLeftToRight",
	        value: function movefromLeftToRight() {
	            this.state.x = this.externals.modules.canvas.width + 10;
	            this.state.y = Math.random() * this.externals.modules.canvas.height;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            var dt = this.externals.state.dt;
	            this.state.x -= this.state.speed * dt;
	            if (this.state.x < 0) this.movefromLeftToRight();
	            //console.log(this.state.speed, this.state.y, this.state.x);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            //render module depenfing on state;
	            var ctx = this.externals.modules.ctx;
	            var canvas = this.externals.modules.canvas;
	            var y = this.state.y + (this.externals.state.player.state.pos[1] - 0.5 * canvas.height) / canvas.height * this.state.yRange;
	            ctx.save();
	            ctx.fillStyle = this.state.color;
	            ctx.beginPath();
	            //console.log(this.state.x, y);
	            ctx.arc(this.state.x, y, this.state.radius, 0, 2 * Math.PI);
	            ctx.fill();
	            ctx.restore();
	        }
	    }]);

	    return Star;
	}();

	exports.default = Star;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Player = __webpack_require__(6);

	var _Player2 = _interopRequireDefault(_Player);

	var _Enemy = __webpack_require__(7);

	var _Enemy2 = _interopRequireDefault(_Enemy);

	var _sprite = __webpack_require__(3);

	var _sprite2 = _interopRequireDefault(_sprite);

	var _Bullet = __webpack_require__(5);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	var _Explosion = __webpack_require__(9);

	var _Explosion2 = _interopRequireDefault(_Explosion);

	var _Gift = __webpack_require__(10);

	var _Gift2 = _interopRequireDefault(_Gift);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    enemies: {
	        regular: function regular(externals) {
	            return new _Enemy2.default(externals);
	        },
	        johnHardson: function johnHardson(externals) {
	            return new _Enemy2.default(externals, 50, 5, new _sprite2.default(externals.modules.spritesUrl, [0, 78], [80, 39], 6, [0, 1, 2, 3, 2, 1]));
	        }
	    },
	    bullets: {
	        regular_forward: function regular_forward(externals, pos) {
	            return new _Bullet2.default(externals, pos, 'forward', 1, 500, new _sprite2.default(externals.modules.spritesUrl, [0, 39], [18, 8]));
	        },
	        torpedo_forward: function torpedo_forward(externals, pos) {
	            return new _Bullet2.default(externals, pos, 'forward', 3, 400, new _sprite2.default(externals.modules.spritesUrl, [10, 290], [10, 10]));
	        },
	        plasma_forward: function plasma_forward(externals, pos) {
	            return new _Bullet2.default(externals, pos, 'forward', 5, 350, new _sprite2.default(externals.modules.spritesUrl, [20, 30], [30, 20]));
	        }
	    },
	    player: function player() {
	        return new _Player2.default(this.getInternals());
	    },
	    powerups: {},
	    gifts: [function (externals, pos) {
	        return new _Gift2.default(externals, "bullets", "torpedo_forward", externals.state.gameTime + Math.random() * 20 + 5, pos);
	    }, function (externals, pos) {
	        return new _Gift2.default(externals, "bullets", "plasma_forward", externals.state.gameTime + Math.random() * 20 + 5, pos, new _sprite2.default(externals.modules.spritesUrl, [0, 400], [50, 50], 5, [0, 1]));
	    }, function (externals, pos) {
	        return new _Gift2.default(externals, "special", "lsd", externals.state.gameTime + Math.random() * 15 + 10, pos, new _sprite2.default(externals.modules.spritesUrl, [0, 450], [50, 50], 5, [0, 1]));
	    }, function (externals, pos) {
	        return new _Gift2.default(externals, "defence", "regular", externals.state.gameTime + Math.random() * 15 + 10, pos, new _sprite2.default(externals.modules.spritesUrl, [0, 600], [50, 50], 5, [0, 1]));
	    }],
	    explosions: {
	        regular: function regular(externals, pos) {
	            return new _Explosion2.default(externals, pos);
	        }
	    }
	};
	/*
	    wapons :
	        - laser curve defender kills every enemy when pass left border
	        - bomb

	*/

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Weapon = function () {
	    function Weapon() {
	        _classCallCheck(this, Weapon);

	        this.default = "regular_forward";
	        this.restoreDefault();
	    }

	    _createClass(Weapon, [{
	        key: "restoreDefault",
	        value: function restoreDefault() {
	            this.current = this.default;
	            //this.expirationTime = 1000000;
	            this.deltaLimit = 100;
	        }
	    }, {
	        key: "set",
	        value: function set(name, expirationTime) {
	            this.current = name;
	            //this.expirationTime = expirationTime || 30;
	            switch (name) {
	                case "regular_forward":
	                    this.deltaLimit = 100;break;
	                case "torpedo_forward":
	                    this.deltaLimit = 130;break;
	                case "plasma_forward":
	                    this.deltaLimit = 160;break;

	            }
	        }
	    }]);

	    return Weapon;
	}();

	exports.default = Weapon;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Powerups = function () {
	    function Powerups(externals) {
	        _classCallCheck(this, Powerups);

	        this.externals = externals; //like player, game state, etc.
	        this.state = [];
	        this.modules = {};
	    }

	    _createClass(Powerups, [{
	        key: "activateOneOfType",
	        value: function activateOneOfType(type) {
	            var i = this.state.length;
	            while (--i >= 0 && !(this.state[i].state.type == type)) {}
	            if (i >= 0) this.state[i].activate();
	        }
	    }, {
	        key: "isAnyActive",
	        value: function isAnyActive() {
	            var i = this.state.length;
	            while (--i >= 0 && !this.state[i].state.active) {}
	            return i > -1;
	        }
	    }, {
	        key: "isAnyOfTypeActive",
	        value: function isAnyOfTypeActive(type) {
	            var i = this.state.length;
	            while (--i >= 0 && !(this.state[i].state.type == type && this.state[i].state.active)) {}
	            return i > -1;
	        }
	    }, {
	        key: "_contains",
	        value: function _contains(name) {
	            var i = this.state.length;
	            while (--i >= 0 && this.state[i].state.name != name) {}
	            return i;
	        }
	    }, {
	        key: "push",
	        value: function push(powerup) {
	            var i = void 0;
	            if ((i = this._contains(powerup.state.name)) < 0) this.state.push(powerup);else this.state[i].state.durationTime += powerup.state.durationTime;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            var pows = this.state;
	            for (var i = 0; i < pows.length;) {
	                pows[i].update();
	                if (pows[i].state.durationTime <= 0) {
	                    pows[i].deactivate();
	                    var type = pows[i].state.type;
	                    pows.splice(i, 1);
	                    this.activateOneOfType(type);
	                } else {
	                    i++;
	                }
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var i = 0;
	            this.state.forEach(function (powerup) {
	                powerup.render(i++);
	            });
	        }
	    }]);

	    return Powerups;
	}();

	exports.default = Powerups;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(18, function() {
				var newContent = __webpack_require__(18);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "html, body {\n  margin: 0;\n  padding: 0;\n  overflow: hidden; }\n\nbody {\n  background: #283044; }\n\nbody.lsd {\n  background-image: url(" + __webpack_require__(20) + ");\n  background-repeat: no-repeat;\n  background-size: 100%;\n  background-position: 9% 9%; }\n\nbody.lsd::before {\n  background-color: rgba(40, 48, 68, 0.9);\n  content: '';\n  display: block;\n  height: 100%;\n  position: absolute;\n  width: 100%; }\n\n.UP, .DOWN, .LEFT, .RIGHT, .FIRE {\n  background-color: white;\n  border: 1px solid white;\n  opacity: 0.1;\n  width: 13%;\n  height: 23.11111%;\n  position: absolute;\n  z-index: 3;\n  border-radius: 50%;\n  -webkit-transition: all 0.6ms ease;\n  transition: all 0.6s ease;\n  display: flex;\n  align-items: center;\n  /* Vertical center alignment */\n  justify-content: center;\n  /* Horizontal center alignment */\n  color: #283044;\n  font-size: 4em;\n  text-align: center;\n  font-weight: bold;\n  outline: none; }\n\ndiv.hide {\n  background-color: transparent;\n  color: transparent; }\n\ndiv.disappear {\n  display: none; }\n\n.UP {\n  right: 20%;\n  bottom: 35%; }\n\n.DOWN {\n  right: 20%;\n  bottom: 2%; }\n\n.LEFT {\n  right: 37%;\n  bottom: 2%; }\n\n.RIGHT {\n  right: 3%;\n  bottom: 2%; }\n\ndiv:not(.FIRE):active {\n  background-color: white;\n  opacity: 0.05; }\n\n.FIRE {\n  width: 40%;\n  height: 100%;\n  bottom: 0;\n  left: 0;\n  border-radius: 0; }\n\n.FIRE.hide {\n  border: none; }\n\ncanvas {\n  display: block;\n  margin: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2; }\n\n.FPS {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  z-index: 3;\n  color: white;\n  font-size: 25px; }\n\n.TIME {\n  position: absolute;\n  top: 20px;\n  left: 160px;\n  z-index: 3;\n  color: white;\n  font-size: 25px; }\n\n.SETFPS {\n  position: absolute;\n  top: 20px;\n  left: 300px;\n  z-index: 3;\n  color: white;\n  font-size: 25px; }\n\n#score {\n  float: right;\n  color: white;\n  font-size: 2.3em;\n  z-index: 3;\n  position: absolute;\n  top: 6%;\n  right: 6%;\n  font-family: sans-serif; }\n\n#game-over, #game-over-overlay {\n  margin: auto;\n  width: 512px;\n  height: 480px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 4;\n  display: none; }\n\n#game-over {\n  height: 200px;\n  text-align: center;\n  color: white; }\n\n#game-over h1 {\n  font-size: 3em;\n  font-family: sans-serif; }\n\n#game-over button {\n  font-size: 1.5em; }\n\n.stars {\n  position: absolute;\n  width: 130vw;\n  height: 170vh;\n  margin-top: -35vh;\n  margin-left: -15vw;\n  z-index: 0;\n  background-image: url(" + __webpack_require__(21) + "); }\n", ""]);

	// exports


/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/lsd.jpg";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/stars.png";

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/terrain.png";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/sprites.png";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/stars_small.png";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "music/Unknown_Planet_cutted.mp3";

/***/ }
]);
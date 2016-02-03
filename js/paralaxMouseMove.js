var easeOutQuad = function (t, b, c, d) {
            t /= d;
            return -c * t*(t-2) + b;
};

function float(el,rangeX,rangeY,reverse) {
    console.log(el);
    var object = {
        node : el,
        top : window.getComputedStyle(el).getPropertyValue("top") != 'auto' ? parseFloat(window.getComputedStyle(el).getPropertyValue("top")) : 0,
        left :  window.getComputedStyle(el).getPropertyValue("left") != 'auto' ? parseFloat(window.getComputedStyle(el).getPropertyValue("left")) : 0,
        rangeX : rangeX,
        rangeY : rangeY,
    };
    console.log(object);
    var rect = object.node.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;
    var w = rect.right - rect.left;
    var h = rect.bottom - rect.top;
    var screenW = window.innerWidth;
    var screenH = window.innerHeight;
    console.log('offsets', screenH, screenW);
    var config = {
        stateX : undefined,
        stateY : undefined,
        targetX : undefined,
        targetY : undefined,
        deltaX : function() {return this.targetX-this.stateX},
        deltaY : function() {return this.targetY-this.stateY},
        init : false,
        time : 1000,
        animation : undefined,
        direction : reverse ? -1 : 1,
        active : true
        
    }
    this.On = function() {
        config.active = true;
    }
    this.Off = function() {
        config.active = false;
    }
    window.addEventListener('mousemove', function(event) {
        if (config.active) {
            var Animation = function() {
                var frameTime = 16.6;
                var on = true
                var deltaX = config.deltaX();
                var deltaY = config.deltaY();
                var startX = config.stateX;
                var startY = config.stateY;
                var time = config.time;
                this.Off = function() {
                    on = false;   
                };


                var frames = Math.round(config.time/frameTime);
                var currentFrame = 1;
                //console.log(frames, currentFrame, startX, deltaX);

                var run = function() {

                    config.stateX = easeOutQuad(currentFrame, startX, deltaX, frames);
                    config.stateY = easeOutQuad(currentFrame, startY, deltaY, frames);
                    currentFrame++;
                    object.node.style.top = object.top + config.stateY*config.direction + 'px';
                    object.node.style.left = object.left + config.stateX*config.direction + 'px';
                    if (on && currentFrame < frames ) 
                        window.requestAnimationFrame(run);

                    }
                run();
            };

            var elementCenterY = Math.round((event.screenY - 0.5*screenH)/screenH * object.rangeY);
            var elementCenterX = Math.round((event.screenX - 0.5*screenW)/screenW * object.rangeX);
            if (!config.init) {
                config.stateX = elementCenterX;
                config.stateY = elementCenterY;
                config.init = true;
                config.targetX = elementCenterX;
                config.targetY = elementCenterY;
                config.animation = new Animation();
            }
            else {
                config.targetX = elementCenterX;
                config.targetY = elementCenterY;
                //console.log(config.deltaX(), config.deltaY());
                config.animation.Off();
                config.animation = new Animation();
            }
        }
    });
    
}

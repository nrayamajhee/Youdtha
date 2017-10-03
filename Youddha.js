/*jslint browser:true */
/*jslint devel: true*/

var world = document.querySelector("world");
var sky = document.querySelector("sky");
var player = document.querySelector("player");
var building = document.querySelector("building");

var hero = {
    x: 100,
    y: 0,
    speed: 256,
    frame: 0
};

var toggleFullScreen = function () {
    'use strict';
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
};

var movePerspective = function (e) {
    'use strict';
    var panLeft, panRight;

    panLeft = e.clientX / document.documentElement.clientWidth * 100;
    panRight = (e.clientY / document.documentElement.clientHeight * 100) + 20;
    // deg = Math.atan((e.clientY - player.offsetTop) / (e.clientX - player.offsetLeft)) / (Math.PI / 180);
    console.log(deg);

    world.style.perspectiveOrigin = panLeft + "% " + panRight + "%";
    // limbs[0].style.transform = 'rotate(' + deg + 'deg)';
    // limbs[1].style.transform = 'rotate(' + deg + 'deg)';
};

// Handle keyboard controls
var keysDown = {};

window.addEventListener("keydown", function (e) {
    'use strict';
    keysDown[e.keyCode] = true;
    if (e.which === 13) {
        toggleFullScreen();
    }
}, false);

window.addEventListener("keyup", function (e) {
    'use strict';
    delete keysDown[e.keyCode];
}, false);

window.addEventListener('mousemove', movePerspective, false);

var deg = 0;
var toRight = true;

// Update game objects
var update = function (modifier) {
    'use strict';
    if (keysDown[38] || keysDown[87]) { // Player holding up
        hero.y += (hero.speed - 100) * modifier;
    }
    if (keysDown[40] || keysDown[83]) { // Player holding down
        // hero.y -= hero.speed * modifier;
    }
    if (keysDown[37] || keysDown[65]) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (keysDown[39] || keysDown[68]) { // Player holding right
        hero.x += hero.speed * modifier;
    }

    if (keysDown[39] || keysDown[68] || keysDown[37] || keysDown[65]) {
        if (toRight) {
            deg += 1;
        } else {
            deg -= 1;
        }
        if (deg < -20 || deg > 20) {
            toRight = !toRight;
        }
    } else {
        deg = 0;
    }
};

var dy = 0;

var physics = function () {
    'use strict';
    dy += 0.1;
    if (hero.y > 0) {
        hero.y -= dy;
    } else {
        dy = 0;
        hero.y = 0;
    }
};

var limbs = document.querySelectorAll("player .left, player .right");

// Draw everything
var render = function () {
    'use strict';
    player.style.left = hero.x + 'px';
    player.style.bottom = hero.y + 'px';
    limbs[0].style.transform = 'rotate(' + deg + 'deg)';
    limbs[2].style.transform = 'rotate(' + deg + 'deg)';
    limbs[1].style.transform = 'rotate(' + -deg + 'deg)';
    limbs[3].style.transform = 'rotate(' + -deg + 'deg)';
};

// Let's play this game!
var then = Date.now();

// The main game loop
var main = function () {
    'use strict';
    var now = Date.now(),
        delta = (now - then) / 1000;

    // if (delta >= 0.0167) {
    update(delta);
    physics();
    render();
    then = now;
    // }

    // Request to do this again ASAP
    window.requestAnimationFrame(main);
};

main();

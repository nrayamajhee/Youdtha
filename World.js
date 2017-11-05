var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var floor = {
    x: 0,
    y: canvas.height - 100,
    w: canvas.width,
    h: 100,
    draw: function () {
        'use strict';
        var gradient = ctx.createLinearGradient(0, floor.y, 0, floor.y + floor.h);
        gradient.addColorStop(0, 'olive');
        gradient.addColorStop(1, 'green');
        ctx.fillStyle = gradient;
        ctx.fillRect(floor.x, floor.y, floor.w, floor.h);
    }
};

var wall = {
    x: 600,
    y: canvas.height -  130,
    w: 50,
    h: 100,
    color: 'brown',
    draw: function () {
        'use strict';
        ctx.fillStyle = wall.color;
        ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
    }
};

var wall2 = {
    x: 50,
    y: canvas.height - 320,
    w: 50,
    h: 100,
    color: 'brown',
    draw: function () {
        'use strict';
        ctx.fillStyle = wall2.color;
        ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
    }
};

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    buttons: [],
    radius: 10,
    crosshair: 5,
    shoot: false,
    grow: function () {
        'use strict';
        mouse.crosshair += 1;
        mouse.radius += 1;
        if (mouse.radius > 20) {
            mouse.radius = 20;
        }
        if (mouse.crosshair > 10) {
            mouse.crosshair = 10;
        }
    },
    shrink: function () {
        'use strict';
        mouse.radius = 10;
        mouse.crosshair = 5;
    },
    draw: function () {
        'use strict';
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2, true);
        ctx.moveTo(mouse.x + mouse.crosshair, mouse.y);
        ctx.lineTo(mouse.x - mouse.crosshair, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - mouse.crosshair);
        ctx.lineTo(mouse.x, mouse.y + mouse.crosshair);
        ctx.stroke();
        if (mouse.shoot) {
            ctx.beginPath();
            ctx.moveTo(player.x + (player.w / 2), player.y + (player.h * 0.2));
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
};

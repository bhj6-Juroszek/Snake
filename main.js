score = 0;
gameOn = true;
gameStarted = false;
window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    canvScore=document.getElementById("score");
    updateScore()
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/15);
}

px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
xv = 1;
function game() {
    if(gameOn) {

        px += xv;
        py += yv;
        if (px < 0) {
            px = tc - 1;
        }
        if (px > tc - 1) {
            px = 0;
        }
        if (py < 0) {
            py = tc - 1;
        }
        if (py > tc - 1) {
            py = 0;
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);

        ctx.fillStyle = "lime";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
            if (trail[i].x == px && trail[i].y == py) {
                gameOn = !gameStarted;
            }
        }
        trail.push({x: px, y: py});
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail++;
            ax = Math.floor(Math.random() * tc);
            ay = Math.floor(Math.random() * tc);
            score++;
            updateScore()
        }
        ctx.fillStyle = "red";
        ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
        startGame();
    } else {
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 100, 100)
    }
    gameStarted = true;
}

function startGame() {
    ctx.fillStyle = "blue";
    for(i = 0; i< canv.width; i++) {
        ctx.fillRect(i,0 ,gs - 2, gs - 2)
    }
    for(i = 0; i< canv.height; i++) {
        ctx.fillRect(0,i ,gs - 2, gs - 2)
    }
    for(i = 0; i< canv.height; i++) {
        ctx.fillRect(canv.width - 18,i ,gs - 2, gs - 2)
    }
    for(i = 0; i< canv.width; i++) {
        ctx.fillRect(i,canv.height - 18 ,gs - 2, gs - 2)
    }


}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }
}

function updateScore() {
    canvScore.innerHTML = "Score: " + score;
}
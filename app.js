const score = document.querySelector(".score");
const start = document.querySelector(".start");
const gameArea = document.querySelector(".gameArea ");
const backgroundMusic = document.getElementById("song");
const crashmusic = document.getElementById("crash");

start.addEventListener("click", startfun);
let player = { speed: 8, score: 0 };

// keys initialization
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
}
function keyup(e) {
    keys[e.key] = false;
    e.preventDefault();
    //console.log(e.key);
}

//collision bet cars
function iscollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    if (
        !(
            aRect.top > bRect.bottom ||
            aRect.bottom < bRect.top ||
            aRect.right < bRect.left ||
            aRect.left > bRect.right
        )
    ) {
        endGame();
        crashmusic.playbackRate = 5;
        crashmusic.play();
        return true;
    }
    return false;
}

//function to move or iterate lines
function movelines() {
    // Get all elements with class 'lines' and convert them into an array
    let lines = Array.from(document.querySelectorAll(".lines"));

    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed + 2;
        item.style.top = item.y + "px";
    });
}
function movelines2() {
    // Get all elements with class 'lines' and convert them into an array
    let lines2 = Array.from(document.querySelectorAll(".lines2"));

    lines2.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed + 2;
        item.style.top = item.y + "px";
    });
}

//function to move or left lines
function leftlines() {
    // Get all elements with class 'lines' and convert them into an array
    let lines = Array.from(document.querySelectorAll(".leftlines"));

    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed + 2;
        item.style.top = item.y + "px";
    });
}

//function to move or right lines
function rightlines() {
    // Get all elements with class 'lines' and convert them into an array
    let lines = Array.from(document.querySelectorAll(".rightlines"));

    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed + 2;
        item.style.top = item.y + "px";
    });
}

//function to end the game
function endGame() {
    player.startfun = false;
    start.classList.remove("hide");
    start.innerHTML =
        "Game Over<br> Your final score is: " +
        player.score +
        "<br>Press here to restart the game";

    backgroundMusic.pause();
}

//function to move enemy cars
function moveEnemy(car) {
    // Get all elements with class 'lines' and convert them into an array
    let enemy = Array.from(document.querySelectorAll(".enemy"));

    enemy.forEach(function (item) {
        if (iscollide(car, item)) {
            console.log("Game Over!");
            endGame();
        }
        if (item.y >= 850) {
            item.y = -400;
            item.style.left = Math.floor(Math.random() * 550) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function gameplay() {
    let car = document.querySelector(".car");
    // to get area of road
    let road = gameArea.getBoundingClientRect();

    if (player.startfun) {
        //moving the lines
        movelines();
        movelines2();
        leftlines();
        rightlines();
        moveEnemy(car);

        //**** keys ko press krne p perform kare
        if (keys.ArrowUp && player.y > road.top + 100) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.height - 70) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < road.width - 50) {
            player.x += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gameplay);
        console.log(player.score++);
        player.score + 1;
        let ps = player.score - 1;
        score.innerText = "Score : " + ps;
    }
}
// start game func
function startfun() {
    //gameArea.classList.remove('hide');

    start.classList.add("hide");
    gameArea.innerHTML = "";
    player.startfun = true;
    player.score = 0;
    // to animate a thing multiple times
    window.requestAnimationFrame(gameplay);

    //create road line
    for (x = 0; x < 5; x++) {
        let roadline = document.createElement("div");
        roadline.setAttribute("class", "lines");
        roadline.y = x * 150;
        roadline.style.top = roadline.y + "px";
        gameArea.appendChild(roadline);
    }
    for (x = 0; x < 5; x++) {
        let roadline = document.createElement("div");
        roadline.setAttribute("class", "lines2");
        roadline.y = x * 150;
        roadline.style.top = roadline.y + "px";
        gameArea.appendChild(roadline);
    }
    //update left road line
    for (x = 0; x < 5; x++) {
        let roadline = document.createElement("div");
        roadline.setAttribute("class", "leftlines");
        roadline.y = x * 150;
        roadline.style.top = roadline.y + "px";
        gameArea.appendChild(roadline);
    }
    //right road line
    for (x = 0; x < 5; x++) {
        let roadline = document.createElement("div");
        roadline.setAttribute("class", "rightlines");
        roadline.y = x * 150;
        roadline.style.top = roadline.y + "px";
        gameArea.appendChild(roadline);
    }

    //create a car of my
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameArea.appendChild(car);

    // move car code
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log(player.x);

    //create enemy cars
    for (x = 0; x < 6; x++) {
        let enemycar = document.createElement("div");
        enemycar.setAttribute("class", "enemy");
        enemycar.y = (x + 1) * 350 * -1;
        enemycar.style.top = enemycar.y + "px";
        enemycar.style.backgroundColor = randomcolor();
        enemycar.style.left = Math.floor(Math.random() * 550) + "px";
        gameArea.appendChild(enemycar);
    }

    backgroundMusic.currentTime = 0; // Reset the music to the beginning
    backgroundMusic.play();
}
function randomcolor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}
/*===== soundeffects =====*/

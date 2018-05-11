var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
};
bgImage.src = "images/background.png";

//Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
};
heroImage.src = "images/hero.png";


//Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

//定义游戏对象
var hero = {
    speed: 256 // movement in the pixel per second
}
var monster = {};
var monstersCaught = 0;


//处理用户输入（handle keyboard controls）
var keysDown = {};
addEventListener("keydown",function(e){
    keysDown[e.keyCode] = true;
},false);
addEventListener("keyup",function(e){
    delete keysDown[e.keyCode];
},false);


//Reset the game when the player catches a monster
var reset = function(){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;


    //Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//update object
var update = function(modifier){
    if(38 in keysDown){ // player holding up
        hero.y -= hero.speed * modifier;
    }
    if(40 in keysDown){ // player holding down
        hero.y += hero.speed * modifier;
    }
    if(37 in keysDown){ // player holding left
        hero.x -= hero.speed * modifier;
    }
    if(39 in keysDown){ // player holding right
        hero.x += hero.speed * modifier;
    }

    //Are they touching
    if(
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y +32)
    ){
        ++monstersCaught;
        reset();
    }
};

//Drawing everything
var render = function(){
    if(bgReady){
        ctx.drawImage(bgImage,0,0);
    }
    if(heroReady){
        ctx.drawImage(heroImage,hero.x,hero.y);
    }
    if(monsterReady){
        ctx.drawImage(monsterImage,monster.x,monster.y);
    }

    //store
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins Caught: " + monstersCaught,32,32);
};

// The main game loop
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var main = function(){
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();

    then = now;

    //Request to do this again ASAP
    requestAnimationFrame(main);
};

//Let's play this game
var then = Date.now();
reset();
main();

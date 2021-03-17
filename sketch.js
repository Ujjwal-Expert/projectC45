/*var database;
var numberOfRooms;
var playerCount;
var roomNumber;
var menu,player,game*/

var verticalImg, perpendicularImg, turnImg;
var orientation1 = 'right';
var player;
var gameState = 'play';
var score=0;

function preload(){
    verticalImg = loadImage('images/horizontalWall.png');
    perpendicularImg = loadImage('images/perpendicularWall.png');
    turnImg = loadImage('images/wallTurn.png');
    plr_right = loadImage('images/plr_right.png');
    plr_left = loadImage('images/plr_left.png');
    plr_up = loadImage('images/plr_up.png');
    plr_down = loadImage('images/plr_down.png');
    plr_upRight = loadImage('images/upRight.png');
    plr_upLeft = loadImage('images/upLeft.png');
    plr_downRight = loadImage('images/downRight.png');
    plr_downLeft = loadImage('images/downLeft.png');
}

function setup(){
    createCanvas(600,600);
    player = createSprite(200,400,10,10);
    player.addImage(plr_right);
    player.scale = 0.2;
    player.setCollider('rectangle',0,0,250,200);
    
    wall1 = new Wall(100,230,20,300);
    
    wall2 = new Wall(150,530,300,20);
    
    wall3 = new Wall(200,200,200,20);

    wall4 = new Wall(400,150,20,300);

    wall5 = new Wall(450,400,300,20);

    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw(){
    background(169,132,79);
    imageMode(CENTER);
    angleMode(DEGREES);
    
    if(gameState==='play'){
        movement();
        createBullet();
        spawnZombies();
    }

    if(gameState==='end'){
        textSize(25);
        fill('red');
        text("Game Over",200,300);
    }
    

    drawSprites();
    push();
    fill('red');
    textSize(20);
    text('Score: '+score,100,50);
    pop();

    
}



function movement(){
    if(keyDown(LEFT_ARROW)){
        player.x -= 5;
        player.addImage(plr_left);
        orientation1 = 'left';
    }
    if(keyDown(RIGHT_ARROW)){
        player.x += 5;
        player.addImage(plr_right);
        orientation1 = 'right';
    }
    if(keyDown(UP_ARROW)){
        player.y -= 5;
        player.addImage(plr_up);
        orientation1 = 'up';
    }
    if(keyDown(DOWN_ARROW)){
        player.y += 5;
        player.addImage(plr_down);
        orientation1 = 'down';
    }
    if(keyDown(UP_ARROW)&&keyDown(RIGHT_ARROW)){
        player.addImage(plr_upRight);
        
    }
    if(keyDown(UP_ARROW)&&keyDown(LEFT_ARROW)){
        player.addImage(plr_upLeft);
        
    }
    if(keyDown(DOWN_ARROW)&&keyDown(RIGHT_ARROW)){
        player.addImage(plr_downRight);
        
    }
    if(keyDown(DOWN_ARROW)&&keyDown(LEFT_ARROW)){
        player.addImage(plr_downLeft);
        
    }
    

    
}

function createBullet(){
    if(keyWentDown('space')){
        var positionX;
        var positionY;
        var velocityX;
        var velocityY;
        console.log(orientation1);
        for(var i=0;i<25;i+=5){
            if(orientation1==='right'){
                velocityX = 5;
                velocityY=0;
                positionX = player.x+25;
                positionY = player.y+7;
            }
            if(orientation1 === 'left'){
                velocityX = -5;
                velocityY=0;
                positionX = player.x -25;
                positionY = player.y-7;
                
            }
            if(orientation1 === 'up'){
                velocityY = -5;
                velocityX=0;
                positionX = player.x+10;
                positionY = player.y-20;

            }
            if(orientation1 === 'down'){
                velocityY = 5;
                velocityX=0;
                positionX = player.x-10;
                positionY = player.y+20;

            }

            var bullet = createSprite(positionX,positionY,5,5);
            bullet.velocityX = velocityX;
            bullet.velocityY = velocityY;
            bullet.shapeColor = 'brown';
            
             
            bulletGroup.add(bullet);
            bullet.lifetime = 150;
        }
    }
}

function spawnZombies(){
    if(frameCount%100===0){

        var zombie = createSprite(random(0,600),random(0,600),20,20);
        zombie.shapeColor = 'green';
        zombieGroup.add(zombie);

    }
    if(player.isTouching(zombieGroup)){
        gameState = 'end';
    }
    for(var i=0; i<zombieGroup.length; i++){
        zombieGroup.get(i);

        player.x;

        var speed = 1;
        if(zombieGroup[i].x>player.x){
            zombieGroup[i].x -= speed;
        }
        if(zombieGroup[i].x<player.x){
            zombieGroup[i].x += speed;
        }
        if(zombieGroup[i].y>player.y){
            zombieGroup[i].y -= speed;
        }
        if(zombieGroup[i].y<player.y){
            zombieGroup[i].y += speed;
        }

        if(bulletGroup.isTouching(zombieGroup.get(i))){
            zombieGroup.get(i).destroy();
            score += 10;
        }
    }
}
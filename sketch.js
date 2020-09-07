var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jungle,invisibleGround,jungleimg;
var monkey,monkey_running,monkey_collided;
var gameOver,gameOverimg;
var restart,restartimg;
var stoneimg;
var bananaimg;
var stoneGroup;
var bananaGroup;
var count;
var score;
var escore;
var lives;

function preload() {
  
  jungleimg = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkey_collided = loadImage("Monkey_01.png");

 stoneimg = loadImage("stone.png");
 bananaimg = loadImage("banana.png"); 
  
 gameOverimg = loadImage("gameOver.png");
 restartimg = loadImage("restart.png");
  
}

function setup() {
  createCanvas(500,300);
  
  jungle = createSprite(250,100,400,300);
  jungle.addImage("jungle",jungleimg);
  jungle.scale = 1;
  jungle.x = jungle.width/2;
  jungle.velocityX = -5;
  
  monkey = createSprite(100,250,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("colloded",monkey_collided);
  monkey.scale = 0.1;
  //monkey.debug = true;
  
  invisibleGround = createSprite(250,290,500,10);
  invisibleGround.visible = false;
  gameOver = createSprite(250,100);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(250,140);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  restart.visible = false;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
  
  count = 0;
  score = 0;
  escore = 0;
  lives = 2;
  
}

function draw() {
  background(220);
  
  if (gameState === PLAY) {
    
    if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
    
   monkey.velocityY = monkey.velocityY + 0.5;
    
    if (keyDown("space")  && monkey.y > 200) {
    monkey.velocityY = -10;
  }
    
  if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score+5;
  } 
    
  if  (stoneGroup.isTouching(monkey) && escore == 0) {
      escore = escore+1;
      lives = lives-1;
      monkey.scale = 0.09;
      stoneGroup.destroyEach();
      bananaGroup.destroyEach();
  }
    
  if (stoneGroup.isTouching(monkey) && escore == 1) {
      escore = escore +1;
      lives = lives-1;
  }
    
  if (stoneGroup.isTouching(monkey) && escore == 2) {
      gameState = END;
  } 
    
  count = count + Math.round(getFrameRate()/60);
    
  spawnStone();
  spawnBanana();
    
  } else if (gameState === END) {
    
    jungle.velocityX = 0;
    monkey.velocityY = 0;
      
    gameOver.visible = true;
    restart.visible = true;
    
    monkey.changeAnimation("collided", monkey_collided);
    
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();
    } 
    
  }
  
  switch(count) {
    case 100: monkey.scale = 0.2;
              break;
    case 200: monkey.scale = 0.3;
              break;
    case 300: monkey.scale = 0.4;
              break;
    case 400: monkey.scale = 0.5;
              break;
    default:  break;   
  }

    
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  text("Score:" + count,340,20);
  text("Score:" + score,400,20);
  text("Lives:" + lives,100,20);
  
}

function spawnStone() {
  if (frameCount % 100 === 0) {
    var stone = createSprite(500,250,40,10);
    stone.addImage("stone",stoneimg);
    stone.scale = 0.2;
    stone.velocityX = -5;
    
    stone.lifetime = 200;
    
    stone.depth = stone.depth;
    monkey.depth = monkey.depth + 1;
    
    stoneGroup.add(stone);

  }
}


function spawnBanana() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(500,180,40,10);
    banana.addImage("banana",bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    
    banana.lifetime = 200;
    
    banana.depth = banana.depth;
    monkey.depth = monkey.depth + 1;

    bananaGroup.add(banana);
  }
}

function reset() {
 
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  jungle.velocityX = -5;
  
  monkey.scale = 0.1;
  
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  
  count = 0;
  score = 0;
  escore = 0;
  lives = 2;

  
}
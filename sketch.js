//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var count=0
var gameover,restart,gameoverimg,restartimg,cloudimg
var cloudsgroup,obstaclegroup
var ob1,ob2,ob3,ob4,ob5,ob6;
var die,jump,checkpoint

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameover=loadImage("gameOver.png")
  groundImage = loadImage("ground2.png")
  
  
  restart=loadImage("restart.png")
  cloudimg=loadImage("cloud.png")
  
  
ob1=loadImage("obstacle1.png");
ob2=loadImage("obstacle2.png");
 ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  
  //sound
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkPoint.mp3")
  
  
  
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("coll",trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,35)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  gameoverimg=createSprite(300,50,21,90)
                        gameoverimg.addImage("game",gameover)
  restartimg=createSprite(200,100,30,20)
  restartimg.addImage("start",restart)
restartimg.scale=0.5
  
  gameoverimg.visible=false
  restartimg.visible=false
  cloudsgroup=new Group()
  obstaclesgroup=new Group()
  
  
  
  
  
  
  
}
function draw() {
  //set background to white
  background(250);
  //display score
  text("Score: "+ count, 500, 30);
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count =count+ Math.round(World.frameRate/60);
    
    if (count>0 && count%100 === 0){
     checkpoint.play()
    }
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space")&&trex.isTouching (ground)){
      trex.velocityY = -14;
    jump.play()
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
   spawnObstacles();
    
    //End the game when trex is touching the obstacle
  if(obstaclesgroup.isTouching(trex)){
  //    playSound("jump.mp3");
    gameState = END;
    die.play()
   }
  }
   
 else if(gameState === END) {
    gameoverimg.visible = true;
    restartimg.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("coll");
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesgroup.setLifetimeEach(-1);
  cloudsgroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restartimg)) {
    reset();
 }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
   cloudsgroup.add(cloud);
  }
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand =Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1);
        break;
    case 1:obstacle.addImage(ob1);
        break;
        case 2:obstacle.addImage(ob2);
        break;
        case 3:obstacle.addImage(ob3);
        break;
        case 4:obstacle.addImage(ob4);
        break;
        case 5:obstacle.addImage(ob5);
        break;
        case 6:obstacle.addImage(ob6);
        break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstaclesgroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameoverimg.visible = false;
  restartimg.visible = false;
  
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  
  trex.changeAnimation("running");
  
  count = 0;
  
}
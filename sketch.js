var player,playerImg1,playerImg2;
var bgImg;
var wall1,wall2;
var zombie,zombieImg;
var bullet,bulletImg;
var heart1,heart1Img;
var heart2,heart2Img;
var heart3,heart3Img;
var zombieGroup;
var bulletGroup;

function preload(){
  playerImg1 = loadImage("assets/shooter_2.png");
  playerImg2 = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bulletImg.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  zombieGroup = new Group();
  bulletGroup = new Group();
  
  player = createSprite(windowWidth/2-150, windowHeight/2, 50, 50);
  player.addImage(playerImg1);
  player.scale = 0.3;
  player.setCollider("rectangle",0,0,200,460);

  wall1 = createSprite(windowWidth/2,windowHeight,windowWidth,30);
  wall1.visible = false;
  wall2 = createSprite(windowWidth/2,0,windowWidth,30);
  wall2.visible = false;

  heart1 = createSprite(windowWidth-100,50);
  heart1.addImage("heart1Image",heart1Img);
  heart1.scale = 0.2;
  heart1.visible = false;

  heart2 = createSprite(windowWidth-100,50);
  heart2.addImage("heart2Image",heart2Img);
  heart2.scale = 0.2;
  heart2.visible = false;

  heart3 = createSprite(windowWidth-100,50);
  heart3.addImage("heart3Image",heart3Img);
  heart3.scale = 0.2;
}

function draw() {
  background(bgImg); 

  if(keyDown("UP_ARROW")){
    player.y = player.y-10;
  }
  if(keyDown("DOWN_ARROW")){
    player.y = player.y+10;
  }
  if(keyWentDown("space")){
    player.addImage(playerImg2);

    bullet = createSprite(200,400,30,10);
    bullet.addImage("bulletImage",bulletImg);
    bullet.scale = 0.3;
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.velocityX = 6;
    bullet.lifetime = 300;
    bulletGroup.add(bullet);

    if(zombieGroup.isTouching(bulletGroup)){
      zombieGroup.destroyEach();
      bulletGroup.destroyEach();
    }
  }
  else if(keyWentUp("space")){
    player.addImage(playerImg1);
  }
  
  
  if(frameCount%90===0){
    zombie = createSprite(windowWidth,random(100,500));
    zombie.addImage("zombieImage",zombieImg);
    zombie.velocityX = -3;
    zombie.scale = 0.17;
    zombie.lifetime = 600;
    zombieGroup.add(zombie);
  }

  
  var edges = createEdgeSprites();
  player.collide(wall1);
  player.collide(wall2);
  drawSprites();
}

var alien,bg;
var ground,gr;
var ringM,ringMaster;
var rabbit,rabbitWalk,rabbitStay,rabbitJump;
var score =0;
var explosion;
var bulletImg,bulletGroup;
var barrelGroup;
var ghostImg;
var gameState="START";
var bg1,invisibleGround;
var space,up,enter;
var sound2,begin,jump;

function preload(){

rabbitWalk=loadAnimation("rabbit-0.png","rabbit-1.png","rabbit-2.png","rabbit-3.png");         
bg1=loadImage("bg.jpg")
bg=loadImage("bg.png")
gr=loadImage("ground.png")
barr=loadImage("barrel1.png")
ringM=loadImage("ringMaster.png")
ring=loadImage("fireRing.png")
rabbitStay=loadAnimation("rabbit-0.png")
rabbitJump=loadAnimation("rabbit-1.png")
bulletImg=loadImage("Bullet-2.png")
explosion=loadAnimation("ghost.png")
space=loadImage("space.png")
up=loadImage("up.png")
enter=loadImage("enter.png")
sound2=loadSound("bullets.wav")
//begin=loadSound("start.wav")
jump=loadSound("jump.wav")
}


function setup(){
createCanvas(1000,600)

circus=createSprite(500,300,1000,800)
circus.addImage(bg)
circus.scale=5;



invisibleGround = createSprite(500,510,1000,5);
invisibleGround.visible = false;
  
ground=createSprite(500,550,800,20);
ground.addImage(gr)
ground.scale=0.7

ringMaster=createSprite(100,440,40,10)
ringMaster.addImage(ringM)
ringMaster.scale=0.15
ringMaster.velocityX=-3

rabbit=createSprite(100,500,40,10)
rabbit.addAnimation("stay",rabbitStay)
rabbit.addAnimation("walking",rabbitWalk)
rabbit.addAnimation("jump",rabbitJump)
rabbit.scale=0.45;

bulletGroup=new Group()
barrelGroup= new Group()
explosionGroup=new Group()
}


function draw(){
background("black")
console.log(gameState)
rabbit.collide(invisibleGround);
//rabbit.debug=true
rabbit.setCollider("rectangle",0,0,140,180)

if(gameState==="START"){
background(bg1)
//begin.play()
fill("orange")
textSize(60)
text("THE CIRCUS RABBIT",200,350)
text("PRESS SPACE TO START",150,450)
if(keyDown("Space")){
gameState="screen1"
}
}
else if(gameState==="screen1"){
  if(keyDown("Enter")){
    gameState="PLAY"
    }
    background(bg1)
    fill("black")
    stroke(10)
    textSize(20)
    
    text("HIT THE BARREL BY BULLETS USING SPACE KEY",270,330)
    text("MAKE SCORE TILL 10 FOR ENTERING LEVEL 2",305,400)
    text("PRESS ENTER TO START",400,450)
    image(space,625,340,150,30)
    image(enter,550,455,70,50)
    textSize(50)
    fill("orange")
    text("LEVEL 1",400,200)
}


else if(gameState==="PLAY"){
//circus.velocityX=-5
//start.stop()
if(circus.x<300){
  circus.x=500
}

if(keyDown(RIGHT_ARROW)){
  rabbit.changeAnimation("walking")
  
}

//if(rabbit.collide(invisibleGround)){
  //rabbit.changeAnimation("walking")
//}

if(keyDown(RIGHT_ARROW)){
  //rabbit.x=rabbit.x+3
  circus.x=circus.x-3
}
console.log(rabbit.x)
if(keyWentUp(RIGHT_ARROW)){
  rabbit.changeAnimation("stay")
}

if(keyIsDown(UP_ARROW)&&(rabbit.y>=300)){
  rabbit.velocityY=-5
  rabbit.changeAnimation("jump")
  jump.play()
}

//if(keyWentUp(UP_ARROW)&&(rabbit.y>=300)){
 // rabbit.changeAnimation("stay")
//}
rabbit.velocityY=rabbit.velocityY+0.09

rabbit.collide(ground)

spawnBarrels();

for(var i =0;i<barrelGroup.length;i++){
  if(barrelGroup.get(i).isTouching(bulletGroup)){
    barrelGroup.get(i).destroy()
    bulletGroup.destroyEach()
    score++
  }
}
for(var i =0;i<barrelGroup.length;i++){
  if(barrelGroup.get(i).isTouching(rabbit)&&(score>0)){
    barrelGroup.get(i).destroy()
    score--
  }
}
//spwanRings();
if(keyDown("space")){
  spawnBullets();
  sound2.play()
}
drawSprites();
fill("lightblue")
textSize(50)
text("score: "+score,800,50)
if(score===5){
  gameState="screen2"
  }
}

else if(gameState==="screen2"){
  if(keyDown("Enter")){
    gameState="PLAY2"
    
    }
    background(bg1)
    fill("black")
    stroke(10)
    textSize(20)
    text("HIT THE BARREL BY BULLETS USING SPACE KEY,",300,300)
    text("GET SAVED BY THE EXPLOSIONS AND",350,370)
    text("MAKE THE BUNNY JUMP USING UP ARROW KEY",305,420)
    text("PRESS ENTER TO CONTINUE",370,490)
    textSize(50)
    fill("orange")
    text("LEVEL 2",400,200)
    image(space,625,310,150,30)
    image(up,630,430,50,30)
    image(enter,580,500,70,50)
}


else if(gameState==="PLAY2"){
  if(circus.x<300){
    circus.x=500
  }
  
  
    spawnexplosion()
  
  if(keyWentDown(RIGHT_ARROW)){
    rabbit.changeAnimation("walking")
    
  }
  if(keyDown(RIGHT_ARROW)){
    //rabbit.x=rabbit.x+3
    circus.x=circus.x-3
  }
  console.log(rabbit.x)
  if(keyWentUp(RIGHT_ARROW)){
    rabbit.changeAnimation("stay")
  }
  
  if(keyWentDown(UP_ARROW)&&(rabbit.y>=300)){
    rabbit.velocityY=-5
    rabbit.changeAnimation("jump")
    jump.play()
  }
  
  if(keyWentUp(UP_ARROW)&&(rabbit.y>=300)){
    rabbit.changeAnimation("stay")
  }
  rabbit.velocityY=rabbit.velocityY+0.09
  
  rabbit.collide(ground)
  
  spawnBarrels();
  
  for(var i =0;i<barrelGroup.length;i++){
    if(barrelGroup.get(i).isTouching(bulletGroup)){
      barrelGroup.get(i).destroy()
      bulletGroup.destroyEach()
      score++
    }
  }
  for(var i =0;i<barrelGroup.length;i++){
    if(barrelGroup.get(i).isTouching(rabbit)&&(score>0)){
      barrelGroup.get(i).destroy()
      score--
    }
  }
  for(var i =0;i<explosionGroup.length;i++){
    if(explosionGroup.get(i).isTouching(bulletGroup)){
     explosionGroup.get(i).destroy()
      explosionGroup.destroyEach()
      score++
    }
  }
  for(var i =0;i<explosionGroup.length;i++){
    if(explosionGroup.get(i).isTouching(rabbit)&&(score>0)){
      explosionGroup.get(i).destroy()
      score--
    }
  }
  //spwanRings();
  if(keyDown("space")){
    spawnBullets();
    sound2.play()
  }
  drawSprites();
  fill("lightblue")
  textSize(50)
  text("score: "+score,800,50)
  if(score===10){
    gameState="END"
    }
  }
  else if(gameState==="END"){
    background(bg1)
    textSize(50)
    fill("lightgreen")
    stroke(7)
    text("GAME OVER!!",350,400)
  }

}


function spawnBarrels(){
  if(frameCount % 200 ===0){
   var barrel = createSprite(1300,490,40,10)
   barrel.addImage(barr)
   barrel.velocityX=-(3+score/2);
   barrel.scale=0.15
   barrel.lifetime=700;
   barrelGroup.add(barrel)

  }
}

function spwanRings(){
  if(frameCount % 200 === 0){
    var fireRing= createSprite(1000,460,40,10)
    fireRing.addImage(ring)
    fireRing.velocityX=-3;
    fireRing.lifetime=400;
    fireRing.scale=0.15
  }
}

function spawnBullets(){
  var bullet = createSprite(150,rabbit.y+20,40,10)
  bullet.addImage(bulletImg)
  bullet.velocityX=+3;
  bullet.scale=0.06
  bullet.lifetime=400
  bulletGroup.add(bullet)
}

function spawnexplosion(){
  if(frameCount% 300===0){
  var explo=createSprite(random(800,1000),random(100,200),40,10)
  explo.addAnimation("blast",explosion)
  explo.scale=0.15
  explo.velocityY=2
  explo.velocityX=-(5+score/2)
  explosionGroup.add(explo)
  }
}
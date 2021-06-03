var tower, tower_image
var ghost, ghost_normal_image
var ghost_jumping_image
var climbers, climber_image
var platform
var door, door_image
var door_group, climber_group
var gamestate = "play"
var underClimbers, underClimbers_group
var spooky_sound

function preload(){
  tower_image = loadImage("tower.png");
  ghost_normal_image = loadImage("ghost-standing.png");
  ghost_jumping_image = loadImage("ghost-jumping.png");
  climber_image = loadImage("climber.png");
  door_image = loadImage("door.png");
  spooky_sound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage(tower_image);
  tower.velocityY = 1;

  climber_group = createGroup();
  door_group = createGroup();
  underClimbers_group = createGroup();

  ghost = createSprite(100,100)
  ghost.addImage(ghost_normal_image);
  ghost.scale = 0.35;
  ghost.setCollider("rectangle",-31,30,60,250);
  spooky_sound.play();
}

function draw() {
  background(0);
  if(gamestate === "play"){
  if(tower.y>600){
  tower.y=0;
  }
  if(keyDown("space")){
    ghost.velocityY = -6.5
  }
  if(keyDown("left_arrow")){
   ghost.x=ghost.x-4
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+4;
  }
  ghost.velocityY = ghost.velocityY + 0.55;

  if(ghost.isTouching(underClimbers_group) || ghost.y>600){
    gamestate = "over";
  }
  climber();
  ghost.collide(climber_group);
  drawSprites();
  }
 
  
  


  if(gamestate === "over"){
  fill("yellow");
  stroke("yellow");
  textSize(30);
  text("Game Over",230,250);
  spooky_sound.stop();
  }

  
}



function climber() {
  if(frameCount % 225 === 0){
  door= createSprite(69,-50);
  door.velocityY=1.82;
  door.x=Math.round(random(50,550));
  door.addImage(door_image);
  door.lifetime = 1000;
  door_group.add(door);

  climbers = createSprite(69,20);
  climbers.velocityY=1.82;
  climbers.x=door.x;
  climbers.addImage(climber_image);
  climbers.lifetime = 1000;
  climber_group.add(climbers);

  underClimbers = createSprite(10,30);
  underClimbers.x=door.x;
  underClimbers.width=climbers.width;
  underClimbers.height = 2;
  underClimbers.velocityY=1.82;
  underClimbers.lifetime = 1000;
  underClimbers_group.add(underClimbers);
  underClimbers.visible=false;

  ghost.depth=climbers.depth+100;
  ghost.depth=door.depth+100;
  }
}

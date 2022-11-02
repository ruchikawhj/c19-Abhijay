var rocket, rocketImg;
var asteroid, asteroidImg, asteroidgroup;
var bckgrd, bckgrdImg;
var coin, coinImg, coinsgroup;

var PLAY = 1;
var END = 0;
var gameState = 1;

var score = 0;


function preload() {
  rocketImg = loadImage("rocket.png");
  bckgrdImg = loadImage("bck.png");
  asteroidImg = loadImage("asteroid.png");
  coinImg = loadImage("coin.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  bckgrd = createSprite(width / 2, height/2,width,height);
  bckgrd.addImage(bckgrdImg);
  bckgrd.velocityY = 4.5;
  bckgrd.scale=2;

  rocket = createSprite(width / 2, height - 100, 20, 20);
  rocket.addImage(rocketImg)
  rocket.scale = 0.07;

  asteroid = new Group();
  coin = new Group();

}

function draw() {
  background(200);
  if (gameState === PLAY) {
    background(0);
    rocket.x = mouseX;
    edges = createEdgeSprites();
    rocket.collide(edges);
  
  if (bckgrd.y > 3*height/4) {
    bckgrd.y = height / 2
  }


createCoins();
createAsteroids();


if (coin.isTouching(rocket)) {
  coin.destroyEach();
  score = score + 10;
}
else 
  if (asteroid.isTouching(rocket)) {
    gameState = END;

    coin.destroyEach();
    asteroid.destroyEach();

    coin.setVelocityYEach(0);
    asteroid.setVelocityYEach(0);
  }
}
  drawSprites();
  textSize(25);
  fill(205);
  text("Score: " + score, width - 150, 30);
}

function createAsteroids() {
  if (frameCount % 100 == 0) {
    var as = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    as.addImage(asteroidImg);
    as.scale = 0.4;
    as.velocityY = 5;
    as.lifetime = 180;
    asteroid.add(as);
  }
}

function createCoins() {
  if (frameCount % 150 == 0) {
    var c = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    c.addImage(coinImg);
    c.scale = 0.035;
    c.velocityY = 4.5;
    c.lifetime = 200;
    coin.add(c);
  }
}

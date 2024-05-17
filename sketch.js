let particles = [];
let colors = [];
let parNum = 1000;

let fadeDuration = 1000;
let stayDuration = 1000;
let fadeInTime, fadeOutTime, stayTime;
let fadeIn = false;
let canvasImg;

let sound;
let soundURL =
  "https://raw.githubusercontent.com/jomo0825/jomo0825.github.io/master/sound/great_compassion.mp3";

function preload() {
  sound = loadSound(soundURL);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  colors[0] = color(random(0, 255), random(0, 255), random(0, 255));
  colors[1] = color(random(0, 255), random(0, 255), random(0, 255));

  for (let i = 0; i < parNum; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

  textAlign(CENTER, CENTER);
  textSize(32);
  canvasImg = createImage(width, height);
}

function draw() {
  image(canvasImg, 0, 0);
  for (let j = particles.length - 1; j > 0; j--) {
    let p = particles[j];
    p.update();
    p.show();
    if (p.finished()) {
      particles.splice(j, 1);
      background(0, 0, 5, 0.1);
    }
  }

  for (let i = particles.length; i < parNum; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  canvasImg = get();

  if (fadeIn) {
    push();
    noStroke();
    let currentTime = millis();
    let elapsed = currentTime - fadeInTime;
    let alpha = 0;

    if (elapsed < fadeDuration) {
      alpha = map(elapsed, 0, fadeDuration, 0, 255);
    } else if (elapsed < fadeDuration + stayDuration) {
      alpha = 255;
    } else if (currentTime - stayTime < fadeDuration) {
      alpha = map(currentTime - stayTime, 0, fadeDuration, 255, 0);
    }

    fill(255, alpha);
    text(message, width / 2, height / 2);
    pop();
  }
}

function ShowText() {
  const text = "Made by Nico";
  fadeIn = true;
  fadeInTime = millis();
  stayTime = fadeInTime + fadeDuration + stayDuration;
  message = text;
}

function Refresh() {
  background(0);
  canvasImg = createImage(width, height);
  canvasImg.loadPixels();
  noiseSeed();
  randomSeed();
  colors[0] = color(random(0, 255), random(0, 255), random(0, 255));
  colors[1] = color(random(0, 255), random(0, 255), random(0, 255));
}

function PlayMusic() {
  sound.stop();
  sound.loop();
}

const toggler = document.querySelector(".menu__toggler");
const menu = document.querySelector(".menu");

toggler.addEventListener("click", () => {
  toggler.classList.toggle("active");
  menu.classList.toggle("active");
});

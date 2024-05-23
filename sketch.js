let multiCircles = [];
let innerMultiCircleNum = 15; // 内圈同心圆数量 Number of inner concentric circles
let layerNum = 8; // 外圈层数 Number of outer layers
let dotSize = 20; // 波点大小 Size of the dots
let dotDensity = 30; // 波点密度 Density of the dots

class MultiCircle {
  // 构造函数，初始化multiCircle的属性
  // Constructor to initialize the properties of multiCircle
  constructor(x, y, maxRadius, innerMultiCircleNum, layerNum) {
    this.x = x;
    this.y = y;
    this.maxRadius = maxRadius;
    this.innerMultiCircleNum = innerMultiCircleNum;
    this.layerNum = layerNum;
    this.innerRadius = maxRadius / 2;
    this.dotRadius = 3;
    this.innerColors = this.generateRandomColors(innerMultiCircleNum);
    this.outerColors = this.generateRandomColors(layerNum);
  }

  // 生成随机颜色数组
  // Generate an array of random colors
  generateRandomColors(num) {
    let colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(color(random(255), random(255), random(255)));
    }
    return colors;
  }

  // 显示multiCircle
  // Display the multiCircle
  display() {
    // 绘制内圈的同心圆
    // Draw inner concentric circles
    noFill();
    for (let i = this.innerColors.length - 1; i >= 0; i--) {
      stroke(this.innerColors[i]);
      strokeWeight(5);
      ellipse(this.x, this.y, this.innerRadius * (i + 1) / this.innerColors.length * 2);
    }

    // 绘制外圈的圆点
    // Draw outer circle dots
    for (let i = 0; i < 360; i += 10) {
      let angle = radians(i);
      for (let j = 0; j < this.outerColors.length; j++) {
        let radius = this.innerRadius + j * this.dotRadius * 2;
        let x = this.x + cos(angle) * radius;
        let y = this.y + sin(angle) * radius;
        fill(this.outerColors[j]);
        noStroke();
        ellipse(x, y, this.dotRadius * 2);
      }
    }
  }
}

function setup() {
  createCanvas(800, 800);

  // 生成随机位置的multiCircle
  // Generate multiCircles at random positions
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let maxRadius = random(150, 300);
    multiCircles.push(new MultiCircle(x, y, maxRadius, innerMultiCircleNum, layerNum));
  }
}

function draw() {
  background(255);
  drawPolkaDotBackground();
  
  // 显示所有multiCircle
  // Display all multiCircles
  for (let mc of multiCircles) {
    mc.display();
  }
}

function drawPolkaDotBackground() {
  // 绘制红色波点背景
  // Draw red polka dot background
  fill(255, 0, 0);
  noStroke();
  for (let y = 0; y < height; y += dotDensity) {
    for (let x = 0; x < width; x += dotDensity) {
      ellipse(x, y, dotSize);
    }
  }
}

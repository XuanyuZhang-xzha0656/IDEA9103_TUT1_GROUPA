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

class Clock {
  // 构造函数，初始化时钟的属性
  // Constructor to initialize the properties of the clock
  constructor(x, y, radius, colors) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colors = colors;
  }

  // 显示时钟
  // Display the clock
  display() {
    // 绘制同心圆
    // Draw concentric circles
    //noFill();
    fill(155,154,157);
    for (let i = this.colors.length - 1; i >= 0; i--) {
      stroke(this.colors[i]);
      strokeWeight(30);
      ellipse(this.x, this.y, this.radius * (i + 1) / this.colors.length * 2);
    }

    // 绘制时钟指针
    // Draw clock hands
    let hr = hour() % 12;
    let mn = minute();
    let sc = second();

    let secondAngle = map(sc, 0, 60, 0, TWO_PI) - HALF_PI;
    let minuteAngle = map(mn, 0, 60, 0, TWO_PI) - HALF_PI;
    let hourAngle = map(hr + mn / 60, 0, 12, 0, TWO_PI) - HALF_PI;

    stroke(255);
    strokeWeight(8);
    line(this.x, this.y, this.x + cos(hourAngle) * this.radius * 0.5, this.y + sin(hourAngle) * this.radius * 0.5);

    strokeWeight(4);
    line(this.x, this.y, this.x + cos(minuteAngle) * this.radius * 0.8, this.y + sin(minuteAngle) * this.radius * 0.8);
  }
}

let multiCircles = [];
let clock;
let innerMultiCircleNum = 15; // 内圈同心圆数量 Number of inner concentric circles
let layerNum = 8; // 外圈层数 Number of outer layers

function setup() {
  createCanvas(800, 800);
  let maxRadius = 100;
  let spacing = maxRadius * 2;
  let cols = floor(width / spacing);
  let rows = floor(height / spacing);

  // 生成边框位置的multiCircle
  // Generate multiCircles at border positions
  for (let i = 0; i < cols; i++) {
    let x = i * spacing + maxRadius;
    let yTop = maxRadius;
    let yBottom = height - maxRadius;
    multiCircles.push(new MultiCircle(x, yTop, maxRadius, innerMultiCircleNum, layerNum));
    multiCircles.push(new MultiCircle(x, yBottom, maxRadius, innerMultiCircleNum, layerNum));
  }

  for (let j = 1; j < rows - 1; j++) {
    let y = j * spacing + maxRadius;
    let xLeft = maxRadius;
    let xRight = width - maxRadius;
    multiCircles.push(new MultiCircle(xLeft, y, maxRadius, innerMultiCircleNum, layerNum));
    multiCircles.push(new MultiCircle(xRight, y, maxRadius, innerMultiCircleNum, layerNum));
  }

  // 初始化时钟
  // Initialize the clock
  let darkColors = ['#2F4F4F', '#696969', '#708090', '#778899'];
  clock = new Clock(width / 2, height / 2, 200, darkColors);
}

function draw() {
  background(0);
  drawSpiralBackground();
  // 显示所有multiCircle
  // Display all multiCircles
  for (let mc of multiCircles) {
    mc.display();
  }
  // 显示时钟
  // Display the clock
  clock.display();
}

function drawSpiralBackground() {
  // 绘制螺旋背景
  // Draw spiral background
  stroke(255);
  strokeWeight(20);
  noFill();
  let angleStep = 2;
  let maxRadius = max(width, height);
  for (let angle = 0; angle < 360 * 10; angle += angleStep) {
    let rad = map(angle, 0, 360 * 10, 0, maxRadius);
    let x = width / 2 + cos(radians(angle)) * rad;
    let y = height / 2 + sin(radians(angle)) * rad;
    point(x, y);
  }
}

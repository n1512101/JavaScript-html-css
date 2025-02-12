const birdDom = document.querySelector('.bird');
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width), birdHeight = parseFloat(birdStyle.height),
  birdTop = parseFloat(birdStyle.top), birdLeft = parseFloat(birdStyle.left);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
    this.g = 1500;
    this.maxY = gameHeight - landHeight - this.height;
    this.swingStatus = 1;  // はねの状態
    this.timer = null;     // はねのタイマー
  }

  startSwing() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.swingStatus = (this.swingStatus + 1) % 3 + 1;
      // this.render();
      this.dom.className = `bird swing${this.swingStatus}`;
    }, 300);
  }

  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }

  move(duration) {
    super.move(duration);
    this.ySpeed += this.g * duration;
  }

  onMove() {
    // topの値の制限
    if (this.top < 0) {
      this.top = 0;
    } else if (this.top > this.maxY) {
      this.top = this.maxY;
    }
  }

  // ジャンプ関数
  jump() {
    this.ySpeed = -450;
  }
}